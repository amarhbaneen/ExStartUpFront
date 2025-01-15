import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AdminService } from '../servics/Admin.service';  // Corrected 'servics' to 'services'
import { LoginData } from '../common/loginData';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';  // Import Router to navigate after login
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardContent,
    MatCard,
    MatFormField,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginData: LoginData = new LoginData('', '');  // LoginData model for handling username/password
  JWT_token: string = '';  // Store the JWT token once received
  isLoading = false;  // Flag to prevent multiple submissions
  hidePassword = true;  // Hide password in input field

  constructor(
    private adminService: AdminService,  // Service to handle API requests
    private snackBar: MatSnackBar,  // Service to show notifications
    private router: Router  // Router to navigate after successful login
  ) {}

  /**
   * Handles form submission for login
   */
  onSubmit(): void {
    if (this.isLoading) return;  // Prevent submission if a request is in progress

    this.isLoading = true;  // Set loading flag to true

    // Call the login method from AdminService
    this.adminService.login(this.loginData).subscribe({
      next: (token: string) => {
        // Save the JWT token in local storage
        this.JWT_token = token;
        localStorage.setItem('jwt_token', token);

        // Decode the token to extract user role
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;

        // Navigate based on the user role
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);  // Navigate to the admin page
          this.snackBar.open('You are logged in as an Admin', 'Close', { duration: 5000 });
        } else if (role === 'USER') {
          this.router.navigate(['/users']);  // Navigate to the user page
          this.snackBar.open('You are logged in as a User', 'Close', { duration: 5000 });
        }
      },
      error: (errorMessage: string) => {
        // Handle errors and display an error message in snackbar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']  // Custom class for error styling
        });
        this.isLoading = false;  // Reset loading flag on error
      },
      complete: () => {
        // Reset loading flag once the API call is complete (either success or error)
        this.isLoading = false;
      }
    });
  }
}
