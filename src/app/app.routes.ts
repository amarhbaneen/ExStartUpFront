import { Routes } from '@angular/router';
import {UserListComponent} from './Admin/user-list/user-list.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {UserPageComponent} from './User/userpage/userpage.component';

export const routes: Routes = [
  {path:'admin',component:UserListComponent},
  {path:'users',component:UserPageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }


];
