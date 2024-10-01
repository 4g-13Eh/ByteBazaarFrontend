import { Routes } from '@angular/router';
import {ItemsComponent} from "../items/items.component";
import {ItemComponent} from "../items/item/item.component";

export const itemsRoutes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    pathMatch: 'full',
  },
  {
    path: 'item/:itemId',
    component: ItemComponent,
    title: 'Details'
  }
]
