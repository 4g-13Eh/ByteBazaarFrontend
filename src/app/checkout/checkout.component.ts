import {Component, inject, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {ItemService} from "../services/item.service";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  private cartService: ShoppingCartService = inject(ShoppingCartService);
  private userService:  UserService = inject(UserService);
  private cartId: string = "";
  cartItems: Array<ShoppingCartItemModel> = [];
  private itemService: ItemService = inject(ItemService);

  private router = inject(Router);

  form = new FormGroup({
    ccNumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14)
      ],
    }),
    ccExpire: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(7)
      ]
    }),
    cvc: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(4)
      ]
    }),
  });

  ngOnInit() {
    this.userService.getUserByEmail().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId
        console.log(`CartId: ${this.cartId}`);
        if (this.cartId) {
          this.cartService.getCartItems(this.cartId).subscribe({
            next: (data: ShoppingCartItemModel[]) => {this.cartItems = data;  console.log(this.cartItems[0].cart)} // cart property is null -> TODO: fix this lil bro
          });
        }
      }
    })
  }

  backToCart(){
    this.router.navigate(['/cart']);
  }

  onBuy(){
    if (this.form.invalid) {
      console.log(this.form.errors)
      return;
    }

    for(let cartItem of this.cartItems){
      this.itemService.decreaseItemStock(cartItem.cartItem.itemId, cartItem.quantity).subscribe();
    }

    this.cartService.clearCart(this.cartId).subscribe();

    this.router.navigate(['/'])
  }

  protected readonly Math = Math;
}
