import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  positions: string[] = [];
  id: any;
  employee: any = [];
  errorMsg: string = '';
  employeeForm: any;

  constructor(private emp: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.positions = this.emp.getAllPositions();
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      department_name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    });
    this.id = this.route.snapshot.params['id'];

    this.emp.getEmployeeById(this.id).subscribe({
      next: (res) => {this.employee = res
        this.employeeForm.patchValue({
          name: this.employee[0].name,
          address: this.employee[0].address,
          phone: this.employee[0].phone,
          department_name: this.employee[0].department_name,
          position: this.employee[0].position,
          salary: this.employee[0].salary
        });        
      },
      error: (error) => this.errorMsg = error
    });
  }

  get name() { return this.employeeForm.get('name'); }
  get address() { return this.employeeForm.get('address'); }
  get phone() { return this.employeeForm.get('phone'); }
  get salary() { return this.employeeForm.get('salary'); }

  selectChange(ev: any) {
    let selectedIndex = ev.target.selectedIndex;
    let optGroupLabel = ev.target.options[selectedIndex].parentNode.getAttribute('label');
    this.employeeForm.patchValue({department_name: optGroupLabel});
  }

  editEmployee(){    
    console.log(this.employeeForm.value);   
  }

  delete(){    
    console.log('deleted - ' + this.id);   
  }
}
