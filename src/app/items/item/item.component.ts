import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {ItemService} from "../../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ItemModel} from "../../models/item.model";
import {AccordionComponent} from "../../ui/accordion/accordion.component";
import {AccordionItemComponent} from "../../ui/accordion/accordion-item/accordion-item.component";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AccordionComponent,
    AccordionItemComponent
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit, OnDestroy{
  itemId!: string;
  item!: ItemModel;

  private route = inject(ActivatedRoute);
  private routeSub!: Subscription;

  private itemService = inject(ItemService);
  private cartService = inject(ShoppingCartService);

  ngOnInit() {
     this.routeSub = this.route.params.subscribe(params =>{
      this.itemId = params['itemId'];
      this.itemService.getItemById(this.itemId).subscribe({
        next: (data: ItemModel) => {
          this.item = data;
        }
      })
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  addToCart(){
    this.cartService.addItemToCart({item: this.item, quantity: 1});
  }

}
