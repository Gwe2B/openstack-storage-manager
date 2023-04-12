import { Injectable } from '@angular/core';
import { OpenstackTokensService } from './openstack-tokens.service';
import { Observable, map, mergeMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OpenstackToken } from 'src/app/core/models/openstack-token';
import { OpenstackIdentifier } from 'src/app/core/models/openstack-identifier';
import { TreeFile, TreeFolder } from 'src/app/core/models/directories-tree';

@Injectable({
  providedIn: 'root',
})
export class ObjectStorageService {
  constructor(
    private tokenService: OpenstackTokensService,
    private http: HttpClient
  ) {}

  getFileList(
    directory: string,
    identity: OpenstackIdentifier,
    parent: TreeFolder | null = null
  ): Observable<TreeFolder> {
    return this.tokenService.getOpenstackToken(identity).pipe(
      mergeMap((token: OpenstackToken) => {
        return this.http
          .get<any>(token.url[3].url + '/' + directory, {
            headers: { 'X-Auth-Token': token.token },
          })
          .pipe(
            map((response) => {
              if (parent === null) {
                let parentName = directory.split('/').pop();
                parent = new TreeFolder(parentName ? parentName : '/', null);
              }

              for (let child of response) {
                console.log(child);
                if (child.content_type) {
                  parent.add(TreeFile.createFromDescriptor(child, parent));
                } else {
                  parent.add(TreeFolder.createFromDescriptor(child, parent));
                }
              }

              return parent;
            }),
            tap((response) => console.log(response))
          );
      })
    );
  }
}
