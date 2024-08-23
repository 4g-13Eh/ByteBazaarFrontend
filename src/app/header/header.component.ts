import {Component, inject, OnInit,} from '@angular/core';
import {ItemService} from "../items/item/item.service";
import {FormsModule} from "@angular/forms";
import { RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, CommonModule, Location, NgIf} from "@angular/common";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import { Observable} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  private itemService = inject(ItemService);
  searchQuery: string = '';
  itemNamePreviews: string[] = [];
  location = inject(Location)
  private cartService = inject(ShoppingCartService);

  cartItemCount$!: Observable<number>;

  // constructor() {
  //   this.itemService.searchResults$.subscribe(results =>{
  //     this.itemNamePreviews = results.map(item => item.name);
  //   });
  // }

  ngOnInit() {
    this.cartItemCount$ = this.cartService.getCartItemCount().asObservable();
  }

  search() {
    this.itemService.searchItems(this.searchQuery);
  }

  // // shows a list of names that correspond to the searchquery
  // onInputChange(){
  //   this.itemNamePreviews != this.itemService.showNamePreviews(this.searchQuery);
  // }

}
