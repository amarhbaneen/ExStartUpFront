import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-user',
  imports: [
    CommonModule,
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
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  // Object to store user data
  userData = {
    username: '',
    firstName: '',
    surName: '',
    password: '',
    role: ''
  };

  // Flag to toggle password visibility
  hidePassword: boolean = true;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>) {
    console.log('CreateUserComponent initialized');
  }

  // Method to create the user and close the dialog with data
  onCreateUser() {
    this.dialogRef.close(this.userData);  // Pass user data back to the parent component
  }

  // Method to cancel the user creation
  onCancel() {
    this.dialogRef.close();  // Close dialog without passing data
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
