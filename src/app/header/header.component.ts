import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ItemService} from "../item/item.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private itemService = inject(ItemService);
  searchQuery: string = '';

  search() {
    this.itemService.searchItems(this.searchQuery);
  }

}
