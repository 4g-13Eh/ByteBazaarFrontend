import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ItemService} from "./item.service";
import {Subscription} from "rxjs";
import {TooltipComponent} from "../ui/tooltip/tooltip.component";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    TooltipComponent,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit, OnDestroy{
  private itemService = inject(ItemService);
  items = this.itemService.getAllItems();
  private searchSubscription!: Subscription;

  onClick(id: string){
    this.itemService.buyItem(id);
  }

  ngOnInit() {
    this.searchSubscription = this.itemService.searchResults$.subscribe(results =>{
      this.items = results;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }


  protected readonly TooltipComponent = TooltipComponent;
}
