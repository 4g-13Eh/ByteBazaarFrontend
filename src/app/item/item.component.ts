import {Component, inject} from '@angular/core';
import {ItemService} from "./item.service";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  private itemService = inject(ItemService);
  items = this.itemService.getAllItems();

  onClick(id: string){
    this.itemService.buyItem(id);
  }

}
