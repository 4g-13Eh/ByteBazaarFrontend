import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ItemService} from "./item.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
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


}
