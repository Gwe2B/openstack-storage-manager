import { Component, Input, OnInit } from '@angular/core';
import { TreeElement, TreeFolder } from 'src/app/core/models/directories-tree';

@Component({
  selector: 'app-directories-tree',
  templateUrl: './directories-tree.component.html',
  styleUrls: ['./directories-tree.component.scss'],
})
export class DirectoriesTreeComponent {
  @Input() directories: string[] = [];
  @Input() tree: TreeElement = new TreeFolder('/');
}
