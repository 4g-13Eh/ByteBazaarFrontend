import { Routes } from '@angular/router';
import {itemsRoutes} from "./items.routes";
import {authRoutes} from "./auth.routes";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "../checkout/checkout.component";
import {AuthGuard} from "../guards/auth.guard";
import {NotFoundComponent} from "../not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    children: itemsRoutes,
    title: 'ByteBazaar',
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    title: 'Cart',
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
