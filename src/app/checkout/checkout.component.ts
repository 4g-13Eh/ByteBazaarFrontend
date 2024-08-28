import {Component, inject} from '@angular/core';
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
  private router = inject(Router);

  buyItems(){
    return this.cartService
  }

  backToCart(){
    this.router.navigate(['/cart']);
  }

  protected readonly Math = Math;
}
