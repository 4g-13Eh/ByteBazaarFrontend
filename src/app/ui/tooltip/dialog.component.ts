import {Component, Inject, inject, Input} from '@angular/core';
import {NgStyle} from "@angular/common";
import {ItemModel} from "../../models/item.model";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-tooltip',
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
export class DialogComponent {
  @Input() tooltipText: string = '';
  @Input() item: ItemModel | undefined;

  private router = inject(Router);
  private cartService = inject(ShoppingCartService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: ItemModel; tooltipText: string }) {
    this.item = data.item;
    this.tooltipText = data.tooltipText;
  }

  onInfoClick(){
    if (!this.item) return;
    this.router.navigate(['/item', this.item.id]);
  }

  onAddToCartClick(){
    if (!this.item) return;
    this.cartService.addItemToCart({item: this.item, quantity: 1});
  }
}
