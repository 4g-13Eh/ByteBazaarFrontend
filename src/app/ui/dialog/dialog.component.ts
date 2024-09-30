import {Component, Inject, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {ItemModel} from "../../models/item.model";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgStyle,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit, OnDestroy{
  @Input() tooltipText: string = '';
  @Input() item: ItemModel | undefined;

  private router = inject(Router);
  private cartService = inject(ShoppingCartService);
  private userService = inject(UserService);
  private cartId = '';
  private userEmail!: string;
  private subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: ItemModel; tooltipText: string }) {
    this.item = data.item;
    this.tooltipText = data.tooltipText;
  }

  ngOnInit() {
    this.subs.push(this.userService.getUserByEmail().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId;
        this.userEmail = data.email;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onInfoClick(){
    console.log(this.item)
    if (!this.item) return;
    this.router.navigate(['/item', this.item.itemId]);
  }

  onAddToCartClick(){
    if (!this.item || !this.item.in_stock || !this.cartId || !this.item) return;
    this.subs.push(this.cartService.addItemToCart(this.cartId, this.item.itemId).subscribe());
  }
}
