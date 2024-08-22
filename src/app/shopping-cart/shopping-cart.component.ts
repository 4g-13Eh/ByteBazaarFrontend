import {Component, inject, OnInit} from '@angular/core';
import {ItemModel} from "../items/item/item.model";
import {ShoppingCartService} from "./shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Array<ItemModel> = [];
  private shoppingCartService = inject(ShoppingCartService);

  ngOnInit() {
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  removeItem(itemId: string) {
    this.shoppingCartService.removeItemFromCart(itemId);
    this.cartItems = this.shoppingCartService.getCartItems(); // Refresh the cart
  }

  clearCart(){
    this.shoppingCartService.clearCart();
    this.cartItems = [];
  }

}
