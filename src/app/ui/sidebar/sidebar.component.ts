import {Component, EventEmitter, Output} from '@angular/core';
import {categories} from "../../items/item/item.model";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 categories!: categories;
 @Output()categorySelected = new EventEmitter();

 onSelectCategory(category: string){
   this.categorySelected.emit(category);
 }
}
