import {Component, inject, } from '@angular/core';
import {ItemService} from "../items/item/item.service";
import {FormsModule} from "@angular/forms";
import { RouterLink, RouterLinkActive} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private itemService = inject(ItemService);
  searchQuery: string = '';
  itemNamePreviews: string[] = [];
  location = inject(Location)

  // constructor() {
  //   this.itemService.searchResults$.subscribe(results =>{
  //     this.itemNamePreviews = results.map(item => item.name);
  //   });
  // }

  search() {
    this.itemService.searchItems(this.searchQuery);
  }

  // // shows a list of names that correspond to the searchquery
  // onInputChange(){
  //   this.itemNamePreviews != this.itemService.showNamePreviews(this.searchQuery);
  // }

}
