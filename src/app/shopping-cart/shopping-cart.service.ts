import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ShoppingCartItemModel} from "./shopping-cart-item.model";
import {UserModel} from "../user/user.model";
import {ShoppingCartModel} from "./shoppingcart.model";
import { v4 as uuidv4 } from "uuid";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartsKey = 'carts';
  private userService = inject(UserService);
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.updateCartItemCount();
  }

  private createCart(){
    let carts: ShoppingCartModel[] = JSON.parse(localStorage.getItem(this.cartsKey) || '[]');

    const newCart: ShoppingCartModel = {
      id: uuidv4().toString(),
      items: []
    };

    carts.push(newCart);
    localStorage.setItem(this.cartsKey, JSON.stringify(carts));

    return newCart;
  }

  private getCartById(cartId: string | null): ShoppingCartModel | null {
    const carts = JSON.parse(localStorage.getItem(this.cartsKey) || '[]');
    return carts.find((cart: ShoppingCartModel) => cart.id === cartId) || null;
  }

  private saveCart(cart: ShoppingCartModel) {
    let carts: ShoppingCartModel[] = JSON.parse(localStorage.getItem(this.cartsKey) || '[]');
    const cartIndex = carts.findIndex(c => c.id === cart.id);
    if (cartIndex !== -1) {
      carts[cartIndex] = cart;
    } else {
      carts.push(cart);
    }
    localStorage.setItem(this.cartsKey, JSON.stringify(carts));
  }

  getCartItems(): ShoppingCartItemModel[]{
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return [];

    const cart = this.getCartById(currentUser.cartId);
    return cart ? cart.items : [];
  }

  addItemToCart(item: ShoppingCartItemModel){
    const currentUser = this.userService.getCurrentUser();
    console.log(currentUser)
    if (!currentUser) return;

    let cart = this.getCartById(currentUser.cartId);
    console.log(cart)
    if (!cart) {
      cart = this.createCart();
      currentUser.cartId = cart.id;
      this.userService.updateUser(currentUser);
    }

    console.log('init cart'+JSON.stringify(cart));

    const existingItem =
      cart.items.find((cartItem: ShoppingCartItemModel) => cartItem.item.id === item.item.id);
    if (existingItem){
      existingItem.quantity += 1;
    } else{
      cart.items.push(item);
    }

    console.log(cart.items)

    this.updateCartItemCount();
    this.saveCart(cart);
  }

  // updateCartItem(updatedCartItem: ShoppingCartItemModel){
  //   const cart = this.getCartItems();
  //   const itemIndex = cart.findIndex(cartItem => cartItem.item.id === updatedCartItem.item.id);
  //
  //   if (itemIndex > -1){
  //     cart[itemIndex].quantity = updatedCartItem.quantity
  //     localStorage.setItem(this.cartKey, JSON.stringify(cart));
  //   }
  // }

  removeItemFromCart(itemId: string){
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const cart = this.getCartById(currentUser.cartId);
    if (!cart) return;

    cart.items = cart.items.filter(item => item.item.id !== itemId);
    this.updateCartItemCount();
    this.saveCart(cart);
  }

  clearCart(){
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const cart = this.getCartById(currentUser.cartId);
    if (!cart) return;

    cart.items = [];
    this.saveCart(cart);
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
