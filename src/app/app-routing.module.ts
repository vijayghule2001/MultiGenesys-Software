import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'employees',component:EmployeeListComponent},
  { path: 'add-employee', component: AddemployeeComponent },
  { path: 'edit-employee/:id', component: EditemployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
