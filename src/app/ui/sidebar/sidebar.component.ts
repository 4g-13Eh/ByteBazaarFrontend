import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CATEGORIES, categories, category} from "../../items/item/item.model";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatChip, MatChipListbox, MatChipOption, MatChipSelectionChange} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ControlValueAccessor} from "@angular/forms";

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
  @Output() categorySelected = new EventEmitter();

 onSelectCategory(category: string, chip: MatChip){
   this.categorySelected.emit(category);
   chip.highlighted= !chip.highlighted;
 }
}
