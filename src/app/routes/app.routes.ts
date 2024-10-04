import { Routes } from '@angular/router';
import {itemsRoutes} from "./items.routes";
import {authRoutes} from "./auth.routes";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "../checkout/checkout.component";
import {AuthenticatedGuard} from "../guards/authenticated.guard";
import {NotFoundComponent} from "../not-found/not-found.component";
import {unauthenticatedGuard} from "../guards/unauthenticated.guard";

export const routes: Routes = [
  {
    path: '',
    children: itemsRoutes,
    title: 'ByteBazaar',
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'auth',
    children: authRoutes,
    canActivate: [unauthenticatedGuard]
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    title: 'Cart',
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout',
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
