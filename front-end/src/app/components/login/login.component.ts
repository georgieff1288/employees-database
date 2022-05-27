import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  errorMsg: string = '';
  subscription!: Subscription;

  constructor(private auth: AuthService, public router: Router) { }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }   
  }

  loginUser(formValue: { email: string, password: string }) {
    this.errorMsg = ''

    this.subscription = this.auth.login(formValue).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.userEmail);
        this.router.navigate(['/']);
      },
      error: (error) => this.errorMsg = error
    })
  }

}
