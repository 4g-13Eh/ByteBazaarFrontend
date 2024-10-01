import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatChip, MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {categories, CATEGORIES, category} from "../../models/category.model";

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
  protected categories: categories = CATEGORIES;
  private selectedCategories: categories = [];

  @Output() protected categorySelected: EventEmitter<categories> = new EventEmitter<categories>();

  protected onSelectCategory(category: category): void {
    const index: number = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
      console.log('Category '+category+' should have been removed')
    } else {
      this.selectedCategories.push(category)
   }
 }

 protected applyFilter(): void {
   this.categorySelected.emit(this.selectedCategories);
 }
}
