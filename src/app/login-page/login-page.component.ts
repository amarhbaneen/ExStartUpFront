import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../servics/login.service';
import { LoginData } from '../common/loginData';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MatInputModule } from '@angular/material/input'; // Add this
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Router} from '@angular/router'; // Add this

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
    MatProgressSpinner,

  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginData: LoginData = new LoginData('', '');
  JWT_token: string = '';
  isLoading = false;
  hidePassword = true;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router  // Add this

  ) {}


  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.loginService.login(this.loginData).subscribe({
      next: (token) => {
        this.JWT_token = token;
        localStorage.setItem('jwt_token', token);
        this.snackBar.open('Login successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/users']);
      },
      error: (errorMessage) => {
        // The error message from the backend will be shown here
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'] ,// Optional: add custom styling
        });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });}
}
