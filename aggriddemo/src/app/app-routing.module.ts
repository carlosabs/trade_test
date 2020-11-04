import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';


const routes: Routes = [
  {path:'users',  component:UserComponent},
  {path:'', component:UserComponent},
  {path:'addUser', component:AddUserComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
