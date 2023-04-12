import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenstackIdentifier } from '../../models/openstack-identifier';
import { OpenstackService } from 'src/app/shared/services/openstack.service';
import { ObjectStorageService } from 'src/app/shared/services/object-storage.service';
import { TreeElement, TreeFolder } from '../../models/directories-tree';

@Component({
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  private identity!: OpenstackIdentifier;
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
}
