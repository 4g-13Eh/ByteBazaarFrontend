import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ItemsComponent} from "./items/items.component";
import {itemRoutes} from "./items/items.routes";

export const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    children: itemRoutes
  },
  {
    path: 'login',
    component: LoginComponent
  }

];
