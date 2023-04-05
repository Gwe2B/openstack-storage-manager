import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AddIdentifierFormComponent } from './pages/add-identifier-form/add-identifier-form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AddIdentifierFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }