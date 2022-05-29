import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  employees!: Observable<any>;
  errorMsg: string = '';
  notification: string ='Loading...';
  constructor(private emp: EmployeeService) { }

  ngOnInit(): void {    
    this.employees = this.emp.getAllEmployees();
    this.employees.subscribe({
      next: (res) => {
        if(res.length > 0){
          this.notification = ''
        }else{
          this.notification = 'There is no employees in database.'
        }
      },
      error: (err) => {this.errorMsg = err, this.notification = ''}
    })    
  }
}