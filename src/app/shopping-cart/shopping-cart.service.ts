import { Injectable } from '@angular/core';
import {ItemModel} from "../items/item/item.model";
import {BehaviorSubject} from "rxjs";
import {ShoppingCartItemModel} from "./shopping-cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartKey = 'shoppingCart';
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.updateCartItemCount();
  }

  getCartItems(): ShoppingCartItemModel[]{
    const cart = localStorage.getItem(this.cartKey);
    const parsedCart = cart ?  JSON.parse(cart) : [];
    if (!Array.isArray(parsedCart)){
      return [];
    }
    console.log(`Parsed cart: ${JSON.stringify(parsedCart)}`);
    return parsedCart
  }

  addItemToCart(item: ItemModel){
    const cart = this.getCartItems();
    const existingItem = cart.find((cartItem: ShoppingCartItemModel) => cartItem.item.id === item.id);

    if (existingItem){
      existingItem.quantity += 1;
    } else{
      cart.push({item, quantity: 1});
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    console.log(`Cart after addItem2Cart ${cart}`);
    this.updateCartItemCount();
  }

  removeItemFromCart(itemId: string){
    const cart = this.getCartItems();
    const updatedCart = cart.filter((cartItem: ShoppingCartItemModel) => cartItem.item.id !== itemId);
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
    const totalItems = cart.reduce((sum:number, cartItem:ShoppingCartItemModel) => sum + cartItem.quantity, 0);
    this.cartItemCount.next(totalItems);
  }
}
