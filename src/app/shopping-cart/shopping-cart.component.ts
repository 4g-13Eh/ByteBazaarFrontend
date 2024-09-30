import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: Array<ShoppingCartItemModel> = [];
  private shoppingCartService = inject(ShoppingCartService);
  private router = inject(Router);
  private cartId!: string;
  private userService = inject(UserService);
  private subs: Subscription[] = [];

  ngOnInit() {
    this.subs.push(this.userService.getUserByEmail().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId
        console.log(`CartId: ${this.cartId}`);
        if (this.cartId) {
          this.shoppingCartService.getCartItems(this.cartId).subscribe({
            next: (data: ShoppingCartItemModel[]) => {this.cartItems = data;  console.log(this.cartItems[0].cart)} // cart property is null -> TODO: fix this lil bro
          });
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  removeItem(itemId: string) {
    this.subs.push(this.shoppingCartService.removeItemFromCart(this.cartId, itemId).subscribe(
      {next: () => {
        this.cartItems = this.cartItems.filter(item => item.cartItem.itemId !== itemId);
      }}
    ));
  }

  clearCart(){
    this.cartItems = [];
    this.subs.push(this.shoppingCartService.clearCart(this.cartId).subscribe({
      next: () => {
        this.cartItems = [];
      }
    }));
  }

  updateQuantity(itemId: string, newQuantity: number, cartItem: ShoppingCartItemModel) {
    if (newQuantity < 1) return;
    if ( newQuantity > cartItem.cartItem.stock_num) newQuantity = cartItem.cartItem.stock_num;

    cartItem.quantity = newQuantity;

    this.subs.push(this.shoppingCartService.updateItemQuantity(this.cartId, itemId, newQuantity)
      .subscribe({
        next: ()=>{
          const cartItemToUpdate =
            this.cartItems.find(cartItem => cartItem.cartItem.itemId === itemId);
          if (cartItemToUpdate){
            cartItemToUpdate.quantity = newQuantity;
          }
        }
      })
    );
  }

  routeToCheckout(){
    this.router.navigate(['/checkout']);
  }
}
