import { Routes } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {LoginPageComponent} from './login-page/login-page.component';

export const routes: Routes = [
  {path:'users',component:UserListComponent},
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }


];
