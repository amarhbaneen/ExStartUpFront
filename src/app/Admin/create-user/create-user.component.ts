import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {CommonModule, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

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
    MatDialogModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userData={
    userName:'',
    firstName:'',
    surName:'',
    password:'',
    role:''
  }
  hidePassword: boolean = true;
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>){
    console.log('CreateUserComponent initialized');

  }

  onCreateUser() {
    // Check the values and close the dialog with the user data
    this.dialogRef.close(this.userData);  // Pass the data back
  }

  onCancel() {
    // Simply close the dialog without sending data
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
