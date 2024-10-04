import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {ItemService} from "../../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ItemModel} from "../../models/item.model";
import {AccordionComponent} from "../../ui/accordion/accordion.component";
import {AccordionItemComponent} from "../../ui/accordion/accordion-item/accordion-item.component";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {NgOptimizedImage} from "@angular/common";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {HeaderComponent} from "../../ui/header/header.component";
import {SearchfieldComponent} from "../../ui/searchfield/searchfield.component";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    NgOptimizedImage,
    HeaderComponent,
    SearchfieldComponent
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit, OnDestroy{
  private itemService: ItemService = inject(ItemService);
  private cartService: ShoppingCartService = inject(ShoppingCartService);
  private userService: UserService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private subs: Subscription[] = [];
  protected itemId!: string;
  protected item!: ItemModel;
  private cartId: string = '';

  ngOnInit() {
    this.subs.push(this.route.params.subscribe(params =>{
      this.itemId = params['itemId'];
      /**
       *  Code below produces a "TypeError: properties are undefined".
       *  This occurs because the item object is not initialized when
       *  the template is first rendered. This happens because the
       *  item data is fetched asynchronously.
       *   https://stackoverflow.com/a/76951201
       */
      this.itemService.getItemById(this.itemId).subscribe({
        next: (data: ItemModel) => {
          this.item = data;
        }
      });
    }));
    this.subs.push(this.userService.getCurrentUser().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  protected addToCart(): void{
    if (!this.item.in_stock) return;
    this.subs.push(this.cartService.addItemToCart(this.cartId, this.itemId).subscribe({
      next: () => {
        console.log('Item added successfully')
      }
    }));
  }
}
