import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";

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
  private router = inject(Router);
  private cartId = "";
  private userService = inject(UserService);
  private cart = this.shoppingCartService

  ngOnInit() {
    this.userService.getUserByEmail().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId
        console.log(`CartId: ${this.cartId}`);
        if (this.cartId) {
          this.shoppingCartService.getCartItems(this.cartId).subscribe({
            next: (data: ShoppingCartItemModel[]) => {this.cartItems = data;  console.log(this.cartItems[0].cart)} // cart property is null -> TODO: fix this lil bro
          });
        }
      }
    })
  }

  removeItem(itemId: string) {
    this.shoppingCartService.removeItemFromCart(this.cartId, itemId).subscribe();
    // this.shoppingCartService.getCartItems(this.cartId).subscribe({next: (data: ShoppingCartItemModel[])=>{this.cartItems = data}});
  }

  clearCart(){
    console.log(`Clear Cart with Id: ${this.cartId}`);
    this.shoppingCartService.clearCart(this.cartId).subscribe();
    this.cartItems = [];
  }

  updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) return;

    this.shoppingCartService.updateItemQuantity(this.cartId, itemId, newQuantity).subscribe({next: ()=>{
      console.log(`Itemcount updated successfully: ${newQuantity}`)
      }});
    this.shoppingCartService.getCartItems(this.cartId).subscribe({next: (data: ShoppingCartItemModel[])=>{this.cartItems = data}});
  }

  routeToCheckout(){
    this.router.navigate(['/checkout']);
  }

  protected readonly Math = Math;
}
