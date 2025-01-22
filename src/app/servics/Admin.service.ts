import {Injectable} from '@angular/core';
import {LoginData} from '../common/loginData';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {User} from '../common/user'; // Importing user model

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // Base API URL for backend communication
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Handles login functionality by sending a POST request to the backend
  login(loginData: LoginData) {
    const body = {
      username: loginData.username,
      password: loginData.password,
    };

    return this.http.post('http://localhost:8080/Auth/login', body, {
      responseType: 'text', // We expect a plain text response
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        // Returns backend error message or a fallback message
        if (error.error) {
          return throwError(() => error.error);
        }
        return throwError(() => 'Login failed. Please try again.');
      })
    );
  }

  // Helper method to handle API errors
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

  // Returns JWT token from localStorage to attach to headers for authorization
  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  // Fetches all users from the backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users', { headers: this.getHeader() }).pipe(
      catchError(this.handleError)  // Catch any errors and handle them
    );
  }

  // Updates a user by ID after fetching user details
  updateUser(user: User): Observable<any> {
    return this.http.get<User>(`${this.apiUrl}/users/${user.id}`, {headers: this.getHeader()}).pipe(
      switchMap(existingUser => {
        // Use the existing user ID to update the user
        return this.http.put(`${this.apiUrl}/users/${existingUser.id}`, user, { headers: this.getHeader() });
      }),
      catchError(this.handleError)
    );
  }

  // Updates the password of a user
  updatePassword(user: User, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/updatePassword/${user.username}`, password, {
      headers: this.getHeader(),
      responseType: 'text' // Expect a text response from the backend
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Creates a new user in the system
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers: this.getHeader() }).pipe(
      catchError(this.handleError)
    );
  }

  // Deletes a user by their ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`, { headers: this.getHeader() }).pipe(
      catchError(this.handleError)
    );
  }

  // Fetches the details of a user by their username
  getUserDetails(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/getByUserName/${username}`, { headers: this.getHeader() }).pipe(
      catchError(this.handleError)
    );
  }
}
