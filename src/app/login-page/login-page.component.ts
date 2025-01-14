import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AdminService } from '../servics/Admin.service';
import { LoginData } from '../common/loginData';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MatInputModule } from '@angular/material/input'; // Add this
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';


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
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router  // Add this

  ) {}



  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.adminService.login(this.loginData).subscribe({
      next: (token) => {
        this.JWT_token = token;
        localStorage.setItem('jwt_token', token);
        console.log(jwtDecode(token));
        // Decode the token to get the role
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']); // Navigate to admin page
          this.snackBar.open('You are logged in as a Admin', 'Close', {
            duration: 5000,
          });
        }
        if(role == 'USER'){
          this.router.navigate(['/users']); // Navigate to users page
          this.snackBar.open('You are logged in as a user', 'Close', {
            duration: 5000,
          });
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
      }
    });
  }




}
