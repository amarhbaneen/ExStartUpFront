import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {user} from '../../common/user';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgIf} from '@angular/common';
import {AdminService} from '../../servics/Admin.service';

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
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userData: user;
  newPassword: string = '';
  isChangingPassword: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: user,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.userData = {...data};
  }

  onCancel() {
    this.dialogRef.close();
  }

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
        },
        complete: () => {
          this.snackBar.open('User Updated Successfully', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
        }
      });
    } else {
      // Just close with updated user data if no password change
      this.dialogRef.close(this.userData);
    }
  }
  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    if (!this.isChangingPassword) {
      this.newPassword = '';
    }
  }
}
