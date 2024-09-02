import {Component, EventEmitter, Output} from '@angular/core';
import {CATEGORIES, categories, category} from "../../items/item/item.model";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatChip, MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatChip,
    MatIcon,
    MatChipListbox,
    RouterLink,
    MatChipOption
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  categories: categories = CATEGORIES;
  selectedCategories: categories = [];

  @Output() categorySelected = new EventEmitter<categories>();

 onSelectCategory(category: category){
   const index = this.selectedCategories.indexOf(category);
   if (index > -1) {
     this.selectedCategories.splice(index, 1);
     console.log('Category '+category+' should have been removed')
   } else{
     this.selectedCategories.push(category)
   }
 }

 applyFilter(){
   this.categorySelected.emit(this.selectedCategories);
 }
}
