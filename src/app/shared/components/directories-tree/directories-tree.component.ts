import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeElement, TreeFile, TreeFolder } from 'src/app/core/models/directories-tree';
import { GetMimeIconPipe } from '../../pipes/get-mime-icon.pipe';

@Component({
  selector: 'app-directories-tree',
  templateUrl: './directories-tree.component.html',
  styleUrls: ['./directories-tree.component.scss'],
})
export class DirectoriesTreeComponent {
  @Input() directories: string[] = [];
  @Input() tree: TreeElement = new TreeFolder('/');

  @Output() nodeClicked = new EventEmitter<TreeElement>();
  @Output() nodeDblClicked = new EventEmitter<TreeElement>();

  getIcon(node: TreeElement): string {
    let result = 'fa fa-folder';
    if(node.isLeaf()) {
      let leaf = <TreeFile>node;
      if(leaf.content_type) {
        result = GetMimeIconPipe.getMimeIcon(leaf.content_type);
      } else {
        result = 'fa fa-file';
      }
    }

    return result;
  }

  onFolderClick(event: MouseEvent, data: TreeElement | null = null) {
    event.stopPropagation();

    if(event.target) {
      let icon: HTMLElement;
      let target = <HTMLElement>event.target;
      if(target.tagName !== 'LI') {
        icon = target;
        target = target.parentElement!;
      } else {
        icon = <HTMLElement>target.firstElementChild;
      }

      const folder = target.getElementsByTagName('ul')[0];
      if(folder) {
        icon.classList.toggle('fa-folder');
        icon.classList.toggle('fa-folder-open');
        folder.classList.toggle('closed');
      }
    }

    if(data) {
      this.nodeClicked.emit(data);
    }
  }

  onDblClick(event: MouseEvent, data: TreeElement): void {
    event.stopPropagation();

    if(event.target) {
      let icon: HTMLElement;
      let target = <HTMLElement>event.target;
      if(target.tagName !== 'LI') {
        icon = target;
        target = target.parentElement!;
      } else {
        icon = <HTMLElement>target.firstElementChild;
      }

      const folder = target.getElementsByTagName('ul')[0];
      if(folder) {
        icon.classList.toggle('fa-folder');
        icon.classList.toggle('fa-folder-open');
        folder.classList.toggle('closed');
      }
    }

    if(data) {
      this.nodeDblClicked.emit(data);
    }
  }
}
