import {inject, Injectable} from '@angular/core';
import {ItemModel} from "../models/item.model";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {categories} from "../models/category.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private httpClient: HttpClient = inject(HttpClient);
  private searchResults: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>([]);

  public getAllItems(): Observable<ItemModel[]> {
    return this.httpClient.get<ItemModel[]>("http://localhost:8080/api/items");
  }

  public getItemById(id: string) {
    return this.httpClient.get<ItemModel>(`http://localhost:8080/api/items/${id}`);
  }

  public decreaseItemStock(itemId: string, quantity: number): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:8080/api/items/stock/${itemId}`, quantity);
  }

  public getItemByCategories(categories: categories): Observable<ItemModel[]> {
    return this.httpClient.post<ItemModel[]>("http://localhost:8080/api/items", categories);
  }

  public searchItems(searchQuery: string) {
    return this.httpClient.post<ItemModel[]>("http://localhost:8080/api/items/search", searchQuery)
  }

  public updateSearchResults(items: ItemModel[]) {
    this.searchResults.next(items);
  }

  public getSearchResults(): Observable<ItemModel[]> {
    return this.searchResults.asObservable();
  }
}
