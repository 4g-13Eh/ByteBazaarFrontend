import {Injectable} from '@angular/core';
import {itemDummydata} from "./item.dummydata";
import {categories, ItemModel} from "./item.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  data: Array<ItemModel> = itemDummydata;
  private searchResultsSubject = new BehaviorSubject<Array<ItemModel>>(this.data);
  searchResults$ = this.searchResultsSubject.asObservable();
  private itemsKey = 'items';
  private cartKey = 'carts';

  getAllItems(): Array<ItemModel>{
    this.saveItem()
    return this.data;
  }

  getItemById(id: string) {
    return this.data.find(item => item.id === id);
  }

  getItemStockNum(id: string){
    const item = this.getItemById(id);
    return item!.stock_num;
  }

  decreaseItemStock(itemId: string, quantity: number) {
    const item = this.getItemById(itemId);

    if (item && item.stock_num >= quantity){
      item.stock_num -= quantity;
      this.saveItem();
    } else {
      console.log('Insufficient stock to decrease.');
    }
  }

  increaseItemStock(itemId: string, quantity: number) {
    const items = this.getAllItems();
    const item: ItemModel | undefined = items.find(i => i.id === itemId);

    if (item){
      item.stock_num += quantity;
      this.saveItem();
    }
  }

  getItemByCategories(categories: categories) {
    return this.data.filter(item =>
      item.category.some(cat =>
        categories.includes(cat)
      )
    );
  }

  searchItems(searchQuery: string) {
    const searchRes = this.data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.searchResultsSubject.next(searchRes);
    console.log(`${JSON.stringify(searchRes)}`);
    console.log(searchQuery.toString())
    return searchRes;
  }

  constructor() {
    const items = localStorage.getItem(this.itemsKey);

    if (items){
      this.data = JSON.parse(items);
    }
  }

  private saveItem(){
    localStorage.setItem(this.itemsKey, JSON.stringify(this.data));
  }
}
