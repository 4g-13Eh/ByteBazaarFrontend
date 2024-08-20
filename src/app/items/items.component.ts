import {Component, inject} from '@angular/core';
import {ItemService} from "./item/item.service";
import {Subscription} from "rxjs";
import {TooltipComponent} from "../ui/tooltip/tooltip.component";


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    TooltipComponent,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  private itemService = inject(ItemService);
  items = this.itemService.getAllItems();
  private searchSubscription!: Subscription;

  isTooltipVisible: boolean = false;
  tooltipText: string = '';
  tooltipX: number = 0;
  tooltipY: number = 0;

  onMouseEnter(event: MouseEvent, item: any) {
    this.tooltipText = `${item.name}: ${item.description}`;
    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY;
    this.isTooltipVisible = true;
  }

  onMouseLeave() {
    this.isTooltipVisible = false;
  }

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
