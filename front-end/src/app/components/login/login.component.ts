import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  public errorMsg: string = '';

  constructor(private auth: AuthService, public router: Router) { }



  loginUser(formValue: { email: string, password: string }) {
    this.errorMsg = ''
    this.auth.login(formValue).subscribe((response) => {  
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/']);
    }, (error)=>{
      this.errorMsg = error;     
    })
  }

}
