import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  errorMsg: string = '';
  positions: any;
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    position_id: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
  });

  constructor(private emp: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.positions = this.emp.getAllPositions();
  }

  get name() { return this.employeeForm.get('name'); }
  get address() { return this.employeeForm.get('address'); }
  get phone() { return this.employeeForm.get('phone'); }
  get position_id() { return this.employeeForm.get('position_id'); }
  get salary() { return this.employeeForm.get('salary'); }

  addEmployee(){
    this.emp.addEmployee(this.employeeForm.value).subscribe({
      next: res=> this.router.navigate(['/employees']),
      error: error => this.errorMsg = error            
    })    
  }
}
