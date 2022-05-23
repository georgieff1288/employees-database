import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:3000/api/login";

  constructor( private http: HttpClient, private router: Router, private cookies: CookieService ) { }
  
  login(user: any){ 
    return this.http.post<any>(this.loginUrl, user, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  logout(): void{
    localStorage.removeItem('access_token');
    this.cookies.delete('jwt');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');    
    return authToken !== null ? true : false;
  }

  get getUserEmail() {
    let email = localStorage.getItem('access_token');    
    return email;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.status === 0) {
      errorMsg =  'A client-side or network error occurred. Handle it accordingly.'
    } else {
      errorMsg = error.error.message
    }
    return throwError(() => new Error(errorMsg));
  }
}