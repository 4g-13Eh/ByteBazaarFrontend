import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from "rxjs";
import {HeaderComponent} from "../ui/header/header.component";
import {SearchfieldComponent} from "../ui/searchfield/searchfield.component";


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
    ReactiveFormsModule,
    HeaderComponent,
    SearchfieldComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, OnDestroy{
  private cartService: ShoppingCartService = inject(ShoppingCartService);
  private userService:  UserService = inject(UserService);
  private itemService: ItemService = inject(ItemService);
  private router: Router = inject(Router);
  private subs: Subscription[] = [];
  private cartId: string = "";
  protected cartItems: Array<ShoppingCartItemModel> = [];

  protected form = new FormGroup({
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

  protected backToCart(){
    this.router.navigate(['/cart']);
  }

  protected onBuy(){
    if (this.form.invalid) {
      console.error(`Invalid form: \n ${this.form.errors}`);
      return;
    }

    for(let cartItem of this.cartItems){
      this.subs.push(this.itemService.decreaseItemStock(cartItem.cartItem.itemId, cartItem.quantity).subscribe());
    }

    this.subs.push(this.cartService.clearCart(this.cartId).subscribe({
      next: () => {
        this.router.navigate(['/'])
      }
    }));
  }
}
