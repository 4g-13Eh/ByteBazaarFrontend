import { Injectable } from '@angular/core';
import {ItemModel} from "../items/item/item.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartKey = 'shoppingCart';
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.updateCartItemCount();
  }

  getCartItems(){
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : []
  }

  addItemToCart(item: ItemModel){
    const cart = this.getCartItems();
    cart.push(item);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartItemCount();
  }

  removeItemFromCart(itemId: string){
    const cart = this.getCartItems();
    const updatedCart = cart.filter((item: ItemModel) => item.id !== itemId);
    localStorage.setItem(this.cartKey, JSON.stringify(updatedCart));
    this.updateCartItemCount();
  }

  clearCart(){
    localStorage.removeItem(this.cartKey);
    this.cartItemCount.next(0);
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  private updateCartItemCount(): void {
    const cart = this.getCartItems();
    this.cartItemCount.next(cart.length);
  }
}
