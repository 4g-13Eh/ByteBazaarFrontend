import { Component, inject} from '@angular/core';
import {ItemService} from "../services/item.service";
import {Subscription} from "rxjs";
import {TooltipComponent} from "../ui/tooltip/tooltip.component";
import {ItemModel} from "../models/item.model";
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "../ui/sidebar/sidebar.component";
import {categories, CATEGORIES} from "../models/category.model";


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    TooltipComponent,
    RouterLink,
    SidebarComponent,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  private itemService = inject(ItemService);
  items = this.itemService.getAllItems();
  private searchSubscription!: Subscription;

  isTooltipVisible: boolean = false;
  isTooltipHovered: boolean = false;
  tooltipText: string = '';
  tooltipX: number = 0;
  tooltipY: number = 0;
  selectedItem!: ItemModel ;

  onMouseEnter(event: MouseEvent, item: ItemModel) {
    const itemElement = event.currentTarget as HTMLElement;
    const rect = itemElement.getBoundingClientRect();
    if (item) {
      this.selectedItem = item;
      this.tooltipText = `${item.name}: CHF ${item.price}`;
      this.tooltipX = rect.x;
      this.tooltipY = rect.y;
      this.isTooltipVisible = true;
    }
  }

  onTooltipEnter() {
    this.isTooltipHovered = true;
  }

  onTooltipLeave() {
    this.isTooltipHovered = false;
    this.checkTooltipVisibility();
  }

  onMouseLeave() {
    setTimeout(() => this.checkTooltipVisibility(), 100);
  }

  checkTooltipVisibility() {
    if (!this.isTooltipHovered) {
      this.isTooltipVisible = false;
    }
  }

  ngOnInit() {
    this.searchSubscription = this.itemService.searchResults$.subscribe(results =>{
      this.items = results;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onCategorySelected(selectedCategories: categories){
    if (selectedCategories.length === 0){
      this.items = this.itemService.getAllItems();
    } else {
      this.items = this.itemService.getItemByCategories(selectedCategories);
      console.log(selectedCategories);
      console.log(this.itemService.getItemByCategories(selectedCategories));
    }
  }

  protected readonly TooltipComponent = TooltipComponent;
}
