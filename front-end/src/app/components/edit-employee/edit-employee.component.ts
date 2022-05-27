import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  positions: any;
  id: any;
  employee: any;
  errorMsg: string = '';
  employeeForm: any;
  deleteSubscription!: Subscription;
  editSubscription!: Subscription;
  empSubscription!: Subscription;

  constructor(private emp: EmployeeService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.positions = this.emp.getAllPositions();
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      position_id: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    });
    this.id = this.route.snapshot.params['id'];  

    this.empSubscription = this.emp.getEmployeeById(this.id).subscribe({
      next: (res) => {
        this.employee = res; 
        this.employeeForm.patchValue({
          name: this.employee[0].name,
          address: this.employee[0].address,
          phone: this.employee[0].phone,
          position_id: this.employee[0].position_id,
          salary: this.employee[0].salary         
        });        
      },
      error: (error) => this.errorMsg = error
    });  
  }

  ngOnDestroy(): void {
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe();
    }
    if(this.editSubscription){
      this.editSubscription.unsubscribe();
    }
    if(this.empSubscription){
      this.empSubscription.unsubscribe();
    }
  }

  get name() { return this.employeeForm.get('name'); }
  get address() { return this.employeeForm.get('address'); }
  get phone() { return this.employeeForm.get('phone'); }
  get salary() { return this.employeeForm.get('salary'); }

  editEmployee(){    
    this.editSubscription = this.emp.updateEmployee(this.employeeForm.value, this.id).subscribe({
      next: res => this.router.navigate(['/employees']),
      error: error => this.errorMsg = error            
    });
  }

  delete(){
    this.deleteSubscription = this.emp.deleteEmployee(this.id).subscribe({
      next: res => this.router.navigate(['/employees']),
      error: error => this.errorMsg = error            
    }); 
  }
}
