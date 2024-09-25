import { Routes } from '@angular/router';
import {itemRoutes} from "./routes/items.routes";
import {authRoutes} from "./routes/auth.routes";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {AuthGuard} from "./guards/authguard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [
  {
    path: '',
    children: itemRoutes,
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
    path: 'test',
    component: TestComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
