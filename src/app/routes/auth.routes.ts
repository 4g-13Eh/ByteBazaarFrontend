import { Routes } from '@angular/router';
import { LoginComponent } from "../auth/login/login.component";
import { SignupComponent } from "../auth/signup/signup.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup'
  }
]
