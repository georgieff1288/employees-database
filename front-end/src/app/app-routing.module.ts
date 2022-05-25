import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesTableComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
