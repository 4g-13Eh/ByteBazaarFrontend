import {Component, inject} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {ItemService} from "../services/item.service";


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
export class CheckoutComponent {
  private cartService = inject(ShoppingCartService);
  private cartId = ""
  cartItems = this.cartService.getCartItems(this.cartId);
  private itemService = inject(ItemService);

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
  })

  backToCart(){
    this.router.navigate(['/cart']);
  }

  onBuy(){
    if (this.form.controls.ccNumber.invalid) {
      console.log(this.form)
      console.log(this.form.errors)
      return;
    }

    const cartItems = this.cartService.getCartItems(this.cartId);

    // for(let cartItem of cartItems){
    //   this.itemService.decreaseItemStock(cartItem.item.id, cartItem.quantity);
    // }

    this.cartService.clearCart(this.cartId);

    this.router.navigate(['/cart'])
  }

  protected readonly Math = Math;
}
