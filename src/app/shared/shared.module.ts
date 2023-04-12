import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectoriesTreeComponent } from './components/directories-tree/directories-tree.component';
import { ButtonLoaderComponent } from './components/button-loader/button-loader.component';

@NgModule({
  declarations: [DirectoriesTreeComponent, ButtonLoaderComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    DirectoriesTreeComponent,
    ButtonLoaderComponent,
  ],
})
export class SharedModule {}
