import {Component, inject} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {ItemService} from "../items/item/item.service";


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
  cartItems = this.cartService.getCartItems();
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

    const ccNum = this.form.controls.ccNumber.value;
    const ccExpire = this.form.controls.ccExpire.value;
    const cvc = this.form.controls.cvc.value;

    const cartItems = this.cartService.getCartItems();

    for(let cartItem of cartItems){
      this.itemService.decreaseItemStock(cartItem.item.id, cartItem.quantity);
    }

    this.cartService.clearCart();

    this.router.navigate(['/cart'])

  }

  protected readonly Math = Math;
}
