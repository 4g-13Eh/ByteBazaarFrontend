import { Routes } from '@angular/router';
import { SigninComponent } from "../auth/signin/signin.component";
import { SignupComponent } from "../auth/signup/signup.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Login'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup'
  }
]
