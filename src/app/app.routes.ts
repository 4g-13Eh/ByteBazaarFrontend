import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ItemsComponent} from "./items/items.component";
import {itemRoutes} from "./routes/items.routes";
import {authRoutes} from "./routes/auth.routes";
import {SignupComponent} from "./auth/signup/signup.component";

export const routes: Routes = [
  // {
  //   path: '',
  // },
  {
    path: 'items',
    children: itemRoutes,
    title: 'ByteBazaar'
  },
  {
    path: 'auth',
    children: authRoutes
  },
];
