import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EmployeesTableComponent,
    EditEmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    EmployeeService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
