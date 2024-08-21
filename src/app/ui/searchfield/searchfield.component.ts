import {Component, inject} from '@angular/core';
import {ItemService} from "../../items/item/item.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-searchfield',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './searchfield.component.html',
  styleUrl: './searchfield.component.css'
})
export class SearchfieldComponent {
  private itemService = inject(ItemService);
  searchQuery: string = '';

  search() {
    this.itemService.searchItems(this.searchQuery);
  }
}
