import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  employees: any = [];
  errorMsg: string = '';
  constructor(private emp: EmployeeService) { }

  ngOnInit(): void {
    this.employees =  this.emp.getAllEmployees().subscribe(
      (response) => { 
        this.employees = response;        
      }, (error)=>{
        this.errorMsg = error;     
      }
    );
  }

}

