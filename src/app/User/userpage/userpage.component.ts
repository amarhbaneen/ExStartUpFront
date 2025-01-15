import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../servics/Admin.service';
import { Router } from '@angular/router';
import { User } from '../../common/user';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-page',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIcon,
    MatProgressSpinnerModule,
    ReactiveFormsModule,  // Add this
    MatIconModule
  ]
})
export class UserPageComponent implements OnInit {
  user: User = new User('', '', 0, '', '', '');
  isLoading = false;
  username: string = '';
  isEditable = false;
  hidePassword = true;
  passwordChanged = false;
  originalPassword = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.username = decodedToken.sub;
      this.loadUserDetails();
    }
  }

  loadUserDetails(): void {
    if (!this.username) {
      this.snackBar.open('Username not found in token', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.adminService.getUserDetails(this.username).subscribe({
      next: (data: User) => {
        this.user = data;
        this.originalPassword = this.user.password;
      },
      error: () => {
        this.snackBar.open('Failed to load user details', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    console.log(User)
    // Check if password was changed
    if (this.user.password !== this.originalPassword) {
      // First update the password
      this.adminService.updatePassword(this.user, this.user.password).subscribe({
        next: () => {
          this.updateUserDetails();
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Failed to update password', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // If password wasn't changed, just update user details
      this.updateUserDetails();
    }
  }

  private updateUserDetails(): void {
    // Store the current password
    const currentPassword = this.user.password;

    // Clear password from user object for general update
    this.user.password = '';

    this.adminService.updateUser(this.user).subscribe({
      next: () => {
        // Restore the password after update
        this.user.password = currentPassword;
        this.originalPassword = currentPassword;

        this.snackBar.open('User details updated successfully', 'Close', {
          duration: 3000
        });
        this.isEditable = false;
      },
      error: () => {
        // Restore the password after error
        this.user.password = currentPassword;

        this.snackBar.open('Failed to update user details', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  toggleEdit(): void {
    if (this.isEditable) {
      // If canceling edit, reset password to original
      this.user.password = this.originalPassword;
    }
    this.isEditable = !this.isEditable;
    this.hidePassword = true;
  }
}
