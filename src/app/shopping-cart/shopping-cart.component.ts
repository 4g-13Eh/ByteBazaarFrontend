import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";
import {Subscription} from "rxjs";
import {HeaderComponent} from "../ui/header/header.component";
import {SearchfieldComponent} from "../ui/searchfield/searchfield.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    SearchfieldComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private cartService: ShoppingCartService = inject(ShoppingCartService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private subs: Subscription[] = [];
  protected cartItems: Array<ShoppingCartItemModel> = [];
  private cartId!: string;

  ngOnInit() {
    this.subs.push(this.userService.getCurrentUser().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId
        console.log(`CartId: ${this.cartId}`);
        if (this.cartId) {
          this.cartService.getCartItems(this.cartId).subscribe({
            next: (data: ShoppingCartItemModel[]) => {
              this.cartItems = data;
            }
          });
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  protected removeItem(itemId: string): void {
    this.subs.push(this.cartService.removeItemFromCart(this.cartId, itemId).subscribe(
      {next: () => {
        this.cartItems = this.cartItems.filter(item => item.cartItem.itemId !== itemId);
      }}
    ));
  }

  protected clearCart(): void {
    this.cartItems = [];
    this.subs.push(this.cartService.clearCart(this.cartId).subscribe({
      next: () => {
        this.cartItems = [];
      }
    }));
  }

  protected updateQuantity(itemId: string, newQuantity: number, cartItem: ShoppingCartItemModel): void {
    if (newQuantity < 1) return;
    if ( newQuantity > cartItem.cartItem.stock_num) newQuantity = cartItem.cartItem.stock_num;

    cartItem.quantity = newQuantity;

    this.subs.push(this.cartService.updateItemQuantity(this.cartId, itemId, newQuantity)
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

  protected routeToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
