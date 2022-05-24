import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Employee } from '../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private endPoint = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  getAllEmployees(){
    return this.http.get<Employee[]>(this.endPoint + 'employees', {withCredentials: true} ).pipe(catchError(this.handleError));
  }

  getEmployeeById(id: number){
    return this.http.get<Employee>(this.endPoint + 'employee/' + id, {withCredentials: true} ).pipe(catchError(this.handleError));
  }

  getAllPositions(){
    let positions = ['Director of marketing', 'Marketing analyst', 'Marketing coordinator', 'Marketing consultant', 'Marketing manager', 'National sales director', 'Regional sales manager', 'Inside sales representative', 'Sales assistant', 'Chief diversity officer', 'HR director', 'Director of recruiting', 'Chief financial officer', 'Client service finance', 'Credit analyst', 'Account broker'];
    return positions;
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
