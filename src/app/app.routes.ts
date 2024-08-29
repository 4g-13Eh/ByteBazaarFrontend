import { Routes } from '@angular/router';
import {itemRoutes} from "./routes/items.routes";
import {authRoutes} from "./routes/auth.routes";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";

export const routes: Routes = [
  // {
  //   path: '',
  // },
  {
    path: '',
    children: itemRoutes,
    title: 'ByteBazaar'
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    title: 'Cart'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout',
  }
];
