import { Injectable } from '@angular/core';
import { LoginData } from '../common/loginData';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
}
