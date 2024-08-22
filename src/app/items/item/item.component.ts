import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {ItemService} from "./item.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ItemModel} from "./item.model";
import {AccordionComponent} from "../../ui/accordion/accordion.component";
import {AccordionItemComponent} from "../../ui/accordion/accordion-item/accordion-item.component";

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
  item: ItemModel | undefined;

  private route = inject(ActivatedRoute);
  private routeSub!: Subscription;

  private itemService = inject(ItemService);

  ngOnInit() {
     this.routeSub = this.route.params.subscribe(params =>{
      this.itemId = params['itemId'];
      this.item = this.itemService.getItemById(this.itemId)
      console.log(this.itemId);
      console.log('item: '+this.item)
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
