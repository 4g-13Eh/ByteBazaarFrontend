import { Routes } from '@angular/router';
import { LoginComponent } from "../auth/signin/login.component";
import { SignupComponent } from "../auth/signup/signup.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup'
  }
]
