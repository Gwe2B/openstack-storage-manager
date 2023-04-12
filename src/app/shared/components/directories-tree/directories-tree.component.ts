import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeElement, TreeFolder } from 'src/app/core/models/directories-tree';

@Component({
  selector: 'app-directories-tree',
  templateUrl: './directories-tree.component.html',
  styleUrls: ['./directories-tree.component.scss'],
})
export class DirectoriesTreeComponent {
  @Input() directories: string[] = [];
  @Input() tree: TreeElement = new TreeFolder('/');

  @Output() nodeClicked = new EventEmitter<TreeElement>();

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
}
