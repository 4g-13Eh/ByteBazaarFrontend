import { Routes } from '@angular/router';
import {ItemsComponent} from "./items.component";
import {ItemComponent} from "./item/item.component";

export const itemRoutes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full',
  },
  {
    path: 'items',
    component: ItemsComponent,
  },
  {
    path: 'items/:id',
    component: ItemComponent,
    title: 'Details' //ToDo -> dynamic item name
  }
]
