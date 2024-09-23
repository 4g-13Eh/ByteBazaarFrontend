import {inject, Injectable} from '@angular/core';
import {ItemModel} from "../models/item.model";
import {BehaviorSubject, Observable} from "rxjs";
import {categories} from "../models/category.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private data: Array<ItemModel> = [];
  private searchResultsSubject = new BehaviorSubject<Array<ItemModel>>(this.data);
  searchResults$ = this.searchResultsSubject.asObservable();
  private httpClient = inject(HttpClient);

  public getAllItems(): Observable<ItemModel[]> {
    return this.httpClient.get<ItemModel[]>("http://localhost:8080/api/items");
  }

  public getItemById(id: string) {
    return this.httpClient.get<ItemModel>(`http://localhost:8080/api/items/${id}`);
  }

  public getItemStockNum(id: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/api/items/stock/${id}`);
  }

  public decreaseItemStock(itemId: string, quantity: number): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:8080/api/items/stock/${itemId}`, quantity);
  }

  /**
   * categories.every(...): This checks that every category in the selected categories array is present in the
   * item.category array. The item can have additional categories, but it must have all the categories from the filter
   * to be included in the results.
   *
   * @param {categories} categories - List of categories which the data should be filtered by
   * @returns {Array<ItemModel>} The result
   */
  public getItemByCategories(categories: categories): Observable<ItemModel[]> {
    return this.httpClient.post<ItemModel[]>("http://localhost:8080/api/items", categories);
  }

  public searchItems(searchQuery: string) {
    return this.httpClient.post<ItemModel[]>("http://localhost:8080/api/items/search", searchQuery)
  }
}
