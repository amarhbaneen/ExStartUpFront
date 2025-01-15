import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { User } from '../../common/user';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { AdminService } from '../../servics/Admin.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    FormsModule,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatIcon,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  userData: User;
  newPassword: string = '';
  isChangingPassword: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    // Clone the data passed to the dialog
    this.userData = { ...data };
  }

  // Close the dialog without any data
  onCancel() {
    this.dialogRef.close();
  }

  // Submit user details and optionally update password
  onSubmit() {
    if (this.isChangingPassword && this.newPassword) {
      this.adminService.updatePassword(this.userData, this.newPassword).subscribe({
        next: (response) => {
          // Show success message
          this.snackBar.open('Password updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          // Close dialog with updated user data
          this.dialogRef.close(this.userData);
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('Error updating password', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // Just close dialog if no password change
      this.dialogRef.close(this.userData);
    }
  }

  // Toggle password change visibility
  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    if (!this.isChangingPassword) {
      this.newPassword = '';  // Reset password field if not changing password
    }
  }
}
