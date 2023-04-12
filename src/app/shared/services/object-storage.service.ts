import { Injectable } from '@angular/core';
import { OpenstackTokensService } from './openstack-tokens.service';
import { Observable, map, mergeMap } from 'rxjs';
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
        let pathSegments = directory
          .split('/')
          .filter((segment) => segment !== '');

        let segment = pathSegments.shift();
        let url = token.url[3].url + (segment ? '/' + segment : '');

        if (url.endsWith('/')) {
          url = url.slice(0, -1);
        }

        url += '?delimiter=/';
        if (pathSegments.length > 0) {
          url += '&prefix=' + pathSegments.join('/') + '/';
        }

        return this.http
          .get<any>(url, {
            headers: { 'X-Auth-Token': token.token },
          })
          .pipe(
            map((response) => {
              if (parent === null) {
                let parentName = directory.split('/').pop();
                parent = new TreeFolder(parentName ? parentName : '/', null);
              }

              for (let child of response) {
                if (child.content_type) {
                  child.name = child.name
                    .split('/')
                    .filter((segment: string) => segment !== '')
                    .pop();

                  parent.add(TreeFile.createFromDescriptor(child, parent));
                } else if (child.subdir) {
                  let name = child.subdir
                    .split('/')
                    .filter((segment: string) => segment !== '')
                    .pop();

                  parent.add(new TreeFolder(name, parent));
                } else {
                  child.name = child.name
                    .split('/')
                    .filter((segment: string) => segment !== '')
                    .pop();

                  parent.add(TreeFolder.createFromDescriptor(child, parent));
                }
              }

              return parent;
            })
          );
      })
    );
  }
}
