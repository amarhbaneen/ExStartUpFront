import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {AdminService} from '../servics/Admin.service';
import {LoginData} from '../common/loginData';
import {CommonModule} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
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
    MatProgressSpinner,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginData: LoginData = new LoginData('', '');
  isLoading = false;
  hidePassword = true;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.adminService.login(this.loginData).subscribe({
      next: (token) => {
        localStorage.setItem('jwt_token', token);
        this.snackBar.open('Login successful!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });

        // Decode the JWT token to get the user's role
        const decodedToken = this.decodeJWT(token);
        const userRole = decodedToken?.role; // Assuming the role is stored in the token payload

        // Navigate based on the user's role
        if (userRole === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/users']);
        }
      },
      error: (errorMessage) => {
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Helper function to decode JWT token
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert to base64
      const payload = JSON.parse(atob(base64)); // Decode and parse the payload
      return payload;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}
