import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectoriesTreeComponent } from './components/directories-tree/directories-tree.component';

@NgModule({
  declarations: [DirectoriesTreeComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule, DirectoriesTreeComponent],
})
export class SharedModule {}
