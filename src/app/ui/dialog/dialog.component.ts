import {Component, Inject, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {ItemModel} from "../../models/item.model";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
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
  @Input() protected tooltipText: string = '';
  @Input() protected item: ItemModel | undefined;

  private router: Router = inject(Router);
  private cartService: ShoppingCartService = inject(ShoppingCartService);
  private userService: UserService = inject(UserService);
  private cartId: string = '';
  private userEmail: string = '';
  private subs: Subscription[] = [];
  private readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: ItemModel; tooltipText: string }) {
    this.item = data.item;
    this.tooltipText = data.tooltipText;
  }

  ngOnInit() {
    this.subs.push(this.userService.getCurrentUser().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId;
        this.userEmail = data.email;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  protected onInfoClick(): void {
    console.log(this.item)
    if (!this.item) return;
    this.router.navigate(['/item', this.item.itemId]);
    this.dialogRef.close();
  }

  protected onAddToCartClick(): void {
    if (!this.item || !this.item.in_stock || !this.cartId || !this.item) return;
    this.subs.push(this.cartService.addItemToCart(this.cartId, this.item.itemId).subscribe());
  }
}
