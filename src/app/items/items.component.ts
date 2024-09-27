import { Component, inject} from '@angular/core';
import {ItemService} from "../services/item.service";
import {Subscription} from "rxjs";
import {DialogComponent} from "../ui/dialog/dialog.component";
import {ItemModel} from "../models/item.model";
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "../ui/sidebar/sidebar.component";
import {categories} from "../models/category.model";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    DialogComponent,
    RouterLink,
    SidebarComponent,
    MatTooltip,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  private itemService = inject(ItemService);
  items: ItemModel[] = [];
  private searchSubscription!: Subscription;

  tooltipText: string = '';
  readonly dialog = inject(MatDialog);

  openDialog(item: ItemModel){
    if (item){
      if (item.price % 2 === 0){
        this.tooltipText = `${item.name}: CHF ${item.price}.-`;

      } else {
        this.tooltipText = `${item.name}: CHF ${item.price}`;
      }
      this.dialog.open(DialogComponent, {
        data: {item, tooltipText: this.tooltipText}
      });
    }
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.itemService.getAllItems().subscribe({
      next: (data: ItemModel[]) => {
        this.items = data;
      }
    })
    this.searchSubscription = this.itemService.searchResults$.subscribe(results  =>{
      this.items = results;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onCategorySelected(selectedCategories: categories){
    if (selectedCategories.length === 0){
      this.itemService.getAllItems().subscribe({
        next: (data: ItemModel[]) => {
          this.items = data;
        }
      });
    } else {
      this.itemService.getItemByCategories(selectedCategories).subscribe({
        next: (data: ItemModel[]) => {
          this.items = data;
        }
      });
    }
  }

  protected getCategoryNames(categories: { id: number; categoryName: string }[]): string {
    return categories ? categories.map(cat => cat.categoryName).join(' / ') : 'No categories available';
  }
}
