import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {ShoppingCartModel} from "../models/shoppingcart.model";
import { v4 as uuidv4 } from "uuid";
import {UserService} from "./user.service";
import {ItemService} from "./item.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartsKey = 'carts';
  userService = inject(UserService);
  itemService = inject(ItemService);
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

  getCartById(cartId: string | null): ShoppingCartModel | null {
    const carts = JSON.parse(localStorage.getItem(this.cartsKey) || '[]');
    return carts.find((cart: ShoppingCartModel) => cart.id === cartId) || null;
  }

  saveCart(cart: ShoppingCartModel) {
    let carts: ShoppingCartModel[] = JSON.parse(localStorage.getItem(this.cartsKey) || '[]');
    const cartIndex = carts.findIndex(c => c.id === cart.id);
    if (cartIndex !== -1) {
      carts[cartIndex] = cart;
    } else {
      carts.push(cart);
    }
    localStorage.setItem(this.cartsKey, JSON.stringify(carts));
    console.log(`Cart ${JSON.stringify(cart)} saved`)
  }

  getCartItems(): ShoppingCartItemModel[]{
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return [];

    const cart = this.getCartById(currentUser.cartId);
    return cart ? cart.items : [];
  }

  addItemToCart(item: ShoppingCartItemModel){
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    let cart = this.getCartById(currentUser.cartId);
    if (!cart) {
      cart = this.createCart();
      currentUser.cartId = cart.id;
      this.userService.updateUser(currentUser);
    }

    let currentStock = this.itemService.getItemStockNum(item.item.id);
    const existingItem =
      cart.items.find((cartItem: ShoppingCartItemModel) => cartItem.item.id === item.item.id);

    if (existingItem){
      if (existingItem.quantity < currentStock){
        existingItem.quantity += 1;
      } else {
        console.log('Cannot add more items. Stock limit reached.');
      }
    } else {
      if (currentStock > 0){
        cart.items.push(item);
      } else {
        console.log('Cannot add more items. Stock limit reached.');
        return;
      }
    }

    this.saveCart(cart);
    this.updateCartItemCount();
  }

  removeItemFromCart(itemId: string){
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const cart = this.getCartById(currentUser.cartId);
    if (!cart) return;

    const item = cart.items.find(item => item.item.id === itemId);
    if (item) {
      cart.items = cart.items.filter(cartItem => cartItem.item.id !== itemId);
      this.saveCart(cart);
      this.updateCartItemCount();
    }

    this.saveCart(cart);
    this.updateCartItemCount();
  }

  clearCart(){
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const cart = this.getCartById(currentUser.cartId);
    if (!cart) return;

    cart.items = [];
    this.saveCart(cart);
    this.updateCartItemCount();
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  updateCartItemCount(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const cart = this.getCartById(currentUser.cartId);
    console.log(cart)
    if (!cart) {
      this.cartItemCount.next(0);
      return;
    }

    const totalItems = cart.items.reduce(
      (sum: number, cartItem: ShoppingCartItemModel) => sum + cartItem.quantity, 0
    );

    this.cartItemCount.next(totalItems);
  }

  updateItemQuantity(itemId: string, newQuantity: number){
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    let cart = this.getCartById(currentUser.cartId);
    if (!cart) return;

    const cartItem = cart.items.find(item => item.item.id === itemId);
    if (!cartItem) return;

    const maxQuantity = this.itemService.getItemStockNum(cartItem.item.id);
    newQuantity = Math.round(newQuantity);

    if (newQuantity < 1) {
      console.log('Quantity must be at least 1.');
      return;
    }

    if (newQuantity > maxQuantity){
      console.log(`Quantity exceeds available stock. Setting to maximum available quantity of ${maxQuantity}.`);
      newQuantity = maxQuantity;
    }

    cartItem.quantity = newQuantity;
    this.saveCart(cart);
    this.updateCartItemCount();
  }
}
