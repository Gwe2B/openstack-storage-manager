import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenstackIdentifier } from '../../models/openstack-identifier';
import { OpenstackService } from 'src/app/shared/services/openstack.service';
import { ObjectStorageService } from 'src/app/shared/services/object-storage.service';
import {
  TreeElement,
  TreeFile,
  TreeFolder,
} from '../../models/directories-tree';
import { finalize } from 'rxjs';

@Component({
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  private identity!: OpenstackIdentifier;

  isLoading: boolean = false;
  loadingProgress: number = 0;

  folderTree!: TreeFolder;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private identityService: OpenstackService,
    private objectStorageService: ObjectStorageService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.identity = this.identityService.getIdentifier(id);
    } else {
      this.router.navigateByUrl('404');
    }

    let rootFileList = this.objectStorageService.getFileList('', this.identity);
    rootFileList.subscribe((tree) => {
      this.folderTree = tree;
    });
  }

  onNodeClick(node: TreeElement): void {
    if (!node.isLeaf()) {
      let buffer = <TreeFolder>node;

      if (buffer) {
        this.objectStorageService
          .getFileList(buffer.getPath(), this.identity, buffer)
          .subscribe((response) => {
            buffer.parent?.replaceNode(buffer, response);
          });
      }
    }
  }

  onNodeDblClick(node: TreeElement): void {
    if (node.isLeaf()) {
      let buffer = <TreeFile>node;

      if (buffer) {
        this.isLoading = true;
        this.loadingProgress = 0;

        this.objectStorageService
          .getFile(buffer.getPath(), this.identity)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe((blobFile) => {
            if (blobFile.type && blobFile.type === 3) {
              this.loadingProgress = (blobFile.loaded * 100) / blobFile.total;
            } else if (blobFile.body) {
              // TODO
            }
          });
      }
    }
  }
}
