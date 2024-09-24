import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {Router} from "@angular/router";
import {ItemService} from "../services/item.service";
import {FormsModule} from "@angular/forms";

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
  itemsSerivce = inject(ItemService);
  private router = inject(Router);
  private cartId = "";

  ngOnInit() {
    this.shoppingCartService.getCartItems(this.cartId).subscribe({
      next: (data: ShoppingCartItemModel[]) => {this.cartItems = data}
    });
  }

  removeItem(itemId: string) {
    this.shoppingCartService.removeItemFromCart(this.cartId, itemId);
    this.shoppingCartService.getCartItems(this.cartId).subscribe({next: (data: ShoppingCartItemModel[])=>{this.cartItems = data}});
  }

  clearCart(){
    this.shoppingCartService.clearCart(this.cartId);
    this.cartItems = [];
  }

  updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) return;

    this.shoppingCartService.updateItemQuantity(this.cartId, itemId, newQuantity);
    this.shoppingCartService.getCartItems(this.cartId).subscribe({next: (data: ShoppingCartItemModel[])=>{this.cartItems = data}});
  }

  routeToCheckout(){
    this.router.navigate(['/checkout']);
  }

  protected readonly Math = Math;
}
