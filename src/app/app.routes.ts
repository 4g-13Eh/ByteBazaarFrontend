import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ItemsComponent} from "./items/items.component";
import {itemRoutes} from "./routes/items.routes";
import {authRoutes} from "./routes/auth.routes";

export const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    children: itemRoutes
  },
  {
    path: 'auth',
    component: LoginComponent,
    children: authRoutes
  },
];
