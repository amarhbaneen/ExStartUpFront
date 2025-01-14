import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../servics/Admin.service';
import { Router } from '@angular/router';
import { user } from '../../common/user';  // Assuming 'user' class is imported correctly
import { jwtDecode } from 'jwt-decode'; // Decode JWT token
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

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
    MatIcon
  ]
})
export class UserPageComponent implements OnInit {
  user: user = new user('', '', 0, '', '', ''); // Initialize empty user
  isLoading = false;
  username: string = '';
  isEditable = false; // Track if fields are editable
  hidePassword =  false;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract username from the JWT token
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
      next: (data: user) => {
        this.user = data;
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
    this.adminService.updateUser(this.user).subscribe({
      next: () => {
        this.snackBar.open('User details updated successfully', 'Close', {
          duration: 3000
        });
      },
      error: () => {
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
    this.isEditable = !this.isEditable; // Toggle editable state
  }
}
