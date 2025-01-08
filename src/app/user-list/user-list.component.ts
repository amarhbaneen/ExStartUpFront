import {Component, OnInit} from '@angular/core';
import {user} from '../common/user';
import {LoginService} from '../servics/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgClass, NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {UserDetailsComponent} from '../user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  imports: [
    MatIcon,
    MatTable,
    MatProgressSpinner,
    NgIf,
    MatIconButton,
    MatTableModule,
    NgClass,
    MatCardContent,
    MatCard
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements  OnInit {
  users : user[] = [];
  displayedColumns: string[] = ['username', 'firstName', 'surName', "role",'actions'];
  isLoading = false;
  constructor(
    private LoginService: LoginService,
    private snackBar: MatSnackBar,
    private dialog :MatDialog,
  ) {
  }
  ngOnInit(): void {
    console.log('UserListComponent initialized');
    this.loadUsers();
  }
  loadUsers(): void {
    this.isLoading = true;
    this.LoginService.getUsers().subscribe({
      next: (users) => {
        console.log('Users loaded:', users);
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.snackBar.open(error, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }
  openEditDialog(user: user): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(result);
      }
    });
  }

  updateUser(updatedUser: user): void {
    this.isLoading = true;
    this.LoginService.updateUser(updatedUser).subscribe({
      next: () => {
        this.isLoading = false;
        // Update the user in the table
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.users = [...this.users]; // Trigger change detection
        }
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Error updating user', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }



}
