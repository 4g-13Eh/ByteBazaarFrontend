import { Routes } from '@angular/router';
import {ItemsComponent} from "../items/items.component";
import {ItemComponent} from "../items/item/item.component";

export const itemRoutes: Routes = [
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
