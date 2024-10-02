import {inject, Injectable} from '@angular/core';
import {ItemModel} from "../models/item.model";
import {BehaviorSubject, Observable} from "rxjs";
import {categories} from "../models/category.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private httpClient: HttpClient = inject(HttpClient);
  private searchResults: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>([]);

  public getAllItems(): Observable<ItemModel[]> {
    return this.httpClient.get<ItemModel[]>("/api/items");
  }

  public getItemById(id: string): Observable<ItemModel> {
    return this.httpClient.get<ItemModel>(`/api/items/${id}`);
  }

  public decreaseItemStock(itemId: string, quantity: number): Observable<void> {
    return this.httpClient.put<void>(`/api/items/stock/${itemId}`, quantity);
  }

  public getItemByCategories(categories: categories): Observable<ItemModel[]> {
    return this.httpClient.post<ItemModel[]>("/api/items", categories);
  }

  public searchItems(searchQuery: string): Observable<ItemModel[]> {
    return this.httpClient.post<ItemModel[]>("/api/items/search", searchQuery)
  }

  public updateSearchResults(items: ItemModel[]): void {
    this.searchResults.next(items);
  }

  public getSearchResults(): Observable<ItemModel[]> {
    return this.searchResults.asObservable();
  }
}
