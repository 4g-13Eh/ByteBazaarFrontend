import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartService} from "./shopping-cart.service";
import {ShoppingCartItemModel} from "./shopping-cart-item.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ItemService} from "../items/item/item.service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Array<ShoppingCartItemModel> = [];
  private shoppingCartService = inject(ShoppingCartService);
  itemService = inject(ItemService);
  private router = inject(Router);

  ngOnInit() {
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  removeItem(itemId: string) {
    this.shoppingCartService.removeItemFromCart(itemId);
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
    this.cartItems = [];
  }

  updateQuantity(itemId: string, newQuantity: number) {
    const item= this.cartItems.find(cartItem => cartItem.item.id === itemId);
    if (item!) {
      const difference = newQuantity - item.quantity;
      console.log(difference);


      if (newQuantity >= 1){
        if(difference > 0){
          console.log(difference)
          console.log('Increase quantity by', difference);
          this.shoppingCartService.addItemToCart(item, difference);
        } else if (difference < 0){
          console.log('Decrease quantity by', Math.abs(difference));
          this.shoppingCartService.decreaseItemQuantity(itemId, Math.abs(difference));
        }
        item.quantity = newQuantity;
      } else {
        console.log('Invalid quantity:', newQuantity);
      }
    } else {
      console.log('Item not found in cart:', itemId);
    }
  }


  routeToCheckout(){
    this.router.navigate(['/checkout']);
  }

  protected readonly Math = Math;
}
