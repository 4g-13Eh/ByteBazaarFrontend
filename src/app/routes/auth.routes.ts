import { Routes } from '@angular/router';
import { SigninComponent } from "../auth/signin/signin.component";
import { SignupComponent } from "../auth/signup/signup.component";
import {NotFoundComponent} from "../not-found/not-found.component";

export const authRoutes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Signin'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup'
  }
]
