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
    console.log('Update requested for item:', itemId, 'with new quantity:', newQuantity);
    const item = this.cartItems.find(
      cartItem => cartItem.item.id === itemId
    );
    console.log(newQuantity)
    if (!item){
      console.log(`Item not found in cart ${itemId}`);
      return;
    }
    if (newQuantity < 1){
      console.log(`Invalid quantity: ${newQuantity}`);
      return;
    }

    item.quantity = newQuantity;

    const currentUser = this.shoppingCartService.userService.getCurrentUser();
    if (currentUser){
      const cart = this.shoppingCartService.getCartById(currentUser.cartId);
      if (cart){
        const cartItem = cart.items.find(cartItem => cartItem.item.id === itemId);
        if (cartItem){
          cartItem.quantity = newQuantity;
          this.shoppingCartService.saveCart(cart);
        }
      }
    }

    this.shoppingCartService.updateCartItemCount();

    this.cartItems = this.shoppingCartService.getCartItems();

  }


  routeToCheckout(){
    this.router.navigate(['/checkout']);
  }

  protected readonly Math = Math;
}
