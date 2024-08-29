import {Component, inject} from '@angular/core';
import {ItemService} from "./item/item.service";
import {Subscription} from "rxjs";
import {TooltipComponent} from "../ui/tooltip/tooltip.component";
import {category, ItemModel} from "./item/item.model";
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "../ui/sidebar/sidebar.component";


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
  filteredItems: any[] = [];


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

  onCategorySelected(category: category) {
    this.filteredItems = this.itemService.getItemByCategories([category]);
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
