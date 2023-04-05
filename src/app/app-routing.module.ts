import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { AddIdentifierFormComponent } from './core/pages/add-identifier-form/add-identifier-form.component';

const routes: Routes = [
  //{ path: 'addIdt', component: AddIdentifierFormComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
