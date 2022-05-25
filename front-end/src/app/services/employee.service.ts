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

  updateEmployee(employee: Employee, id: any){ 
    return this.http.put<Employee>(this.endPoint + 'update-employee/' + id, employee, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: any){
    return this.http.delete<Employee>(this.endPoint + 'delete-employee/' + id, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  getAllPositions(){
    let positions =[
      {'department':'Marketing', 'positions':[{'name':'Director of marketing', 'id':1}, {'name':'Marketing analyst', 'id':2}, {'name':'Marketing coordinator', 'id':3}, {'name':'Marketing consultant', 'id':4}, {'name':'Marketing manager', 'id':5}]},
      {'department':'Sales', 'positions':[{'name':'National sales director', 'id':6}, {'name':'Regional sales manager', 'id':7}, {'name':'Inside sales representative', 'id':8}, {'name':'Sales assistant', 'id':9}]},
      {'department':'HR', 'positions': [{'name':'Chief diversity officer', 'id':10}, {'name':'HR director', 'id':11}, {'name':'Director of recruiting', 'id':12}]},
      {'department':'Finance', 'positions':[{'name':'Chief financial officer', 'id':13}, {'name':'Client service finance', 'id':14}, {'name':'Credit analyst', 'id':15}, {'name':'Account broker', 'id':16}]}];

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
