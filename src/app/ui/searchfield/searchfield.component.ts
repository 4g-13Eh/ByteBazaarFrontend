import {Component, inject} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-searchfield',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './searchfield.component.html',
  styleUrl: './searchfield.component.css'
})
export class SearchfieldComponent {
  private itemService = inject(ItemService);
  private router = inject(Router);
  searchQuery: string = '';

  search() {
    this.router.navigate(['/']);
    this.itemService.searchItems(this.searchQuery);
  }
}
