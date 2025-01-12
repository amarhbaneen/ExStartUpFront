import { Injectable } from '@angular/core';
import { LoginData } from '../common/loginData';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {user} from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  login(loginData: LoginData) {
    const body = {
      username: loginData.username,
      password: loginData.password
    };

    return this.http.post('http://localhost:8080/Auth/login', body, {
      responseType: 'text'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server error:', error);
        // Return the error message from the backend if available
        if (error.error) {
          return throwError(() => error.error);
        }
        // Fallback error message
        return throwError(() => 'Login failed. Please try again.');
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error || 'Server error';
    }
    return throwError(() => errorMessage);
  }

  private  getHeader() : HttpHeaders {
    const  token = localStorage.getItem('jwt_token');
    return new  HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });}


  getUsers() : Observable<user[]> {
      return this.http.get<user[]>('http://localhost:8080/users',{headers:this.getHeader()}).pipe(
        catchError(this.handleError)
      );
  }
  updateUser(user: user): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user,{headers:this.getHeader()}).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: user): Observable<user>{
    return  this.http.post<user>(`${this.apiUrl}/users`, user,{headers:this.getHeader()}).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(Id:number){
    return this.http.delete(`${this.apiUrl}/users/delete/${Id}`,{headers:this.getHeader()}).pipe(
      catchError(this.handleError)
    )
  }
}
