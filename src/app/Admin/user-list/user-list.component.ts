import { Component, OnInit } from '@angular/core';
import { User } from '../../common/user';
import { AdminService } from '../../servics/Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass, NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { CreateUserComponent } from '../create-user/create-user.component';

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
    MatCard,
    MatDialogModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['username', 'firstName', 'surName', 'role', 'actions'];
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('UserListComponent initialized');
    this.loadUsers();
  }

  // Load users from the server
  loadUsers(): void {
    this.isLoading = true;
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading users', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  // Open edit user dialog
  openEditDialog(user: User): void {
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

  // Open create user dialog
  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createUser(result);
      }
    });
  }

  // Update user data in the table
  updateUser(updatedUser: User): void {
    this.isLoading = true;
    this.adminService.updateUser(updatedUser).subscribe({
      next: () => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.users = [...this.users]; // Trigger change detection
        }
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Error updating user', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  // Create a new user
  createUser(newUser: User): void {
    this.isLoading = true;
    this.adminService.createUser(newUser).subscribe({
      next: (createdUser: User) => {
        this.users.push(createdUser);
        this.users = [...this.users]; // Trigger change detection
        this.snackBar.open('User created successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Error creating user', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  // Delete user by ID
  deleteUser(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return;
    }

    this.isLoading = true;
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Error deleting user', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.isLoading = false;
      }
    });
  }
}
