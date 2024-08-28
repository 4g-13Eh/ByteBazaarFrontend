import {Component, inject, TemplateRef} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {PaymethodComponent} from "../ui/paymethod/paymethod.component";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    PaymethodComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private cartService = inject(ShoppingCartService);
  cartItems = this.cartService.getCartItems();

  buyItems(){
    return this.cartService
  }

  protected readonly Math = Math;
}
