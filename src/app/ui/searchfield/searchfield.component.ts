import {Component, inject, OnDestroy} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ItemModel} from "../../models/item.model";

@Component({
  selector: 'app-searchfield',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './searchfield.component.html',
  styleUrl: './searchfield.component.css'
})
export class SearchfieldComponent implements OnDestroy{
  private itemService = inject(ItemService);
  private router = inject(Router);
  searchQuery: string = '';
  private subs: Subscription[] = [];

  search() {
    if (this.searchQuery.trim() === ''){
      this.subs.push(this.itemService.getAllItems().subscribe({
        next: (items: ItemModel[]) => {
          this.itemService.updateSearchResults(items);
          this.router.navigate(['/']);
        }
      }));
    } else{
      this.subs.push(this.itemService.searchItems(this.searchQuery).subscribe({
        next: (items => {
          this.itemService.updateSearchResults(items);
          this.router.navigate(['/']);
        })
      }));
    }

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
