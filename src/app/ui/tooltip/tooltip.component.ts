import {Component, inject, Input} from '@angular/core';
import {NgStyle} from "@angular/common";
import {ItemModel} from "../../items/item/item.model";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  @Input() isHidden: boolean = true;
  @Input() tooltipText: string = '';
  @Input() xPos: number = 0;
  @Input() yPos: number = 0;
  @Input() item!: ItemModel;

  private router = inject(Router);
  private cartService = inject(ShoppingCartService);

  get tooltipStyle() {
    return {
      'display': this.isHidden ? 'none' : 'block',
      'top': `${this.yPos}px`,
      'left': `${this.xPos}px`,
    };
  }

  onInfoClick(){
    this.router.navigate(['/item', this.item.id]);
  }

  onAddToCartClick(){
    this.cartService.addItemToCart({item: this.item, quantity: 1});
  }

}
