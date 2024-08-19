import { Injectable } from '@angular/core';
import {itemDummydata} from "./item.dummydata";
import {categories, ItemData, ItemModel} from "./item.model";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  data: Array<ItemModel> = itemDummydata;

  getAllItems(): Array<ItemModel>{
    this.saveItem()
    return this.data;
  }

  getItemById(id: string) {
    return this.data.find(item => item.id === id);
  }

  getItemByName(name: string) {
    return this.data.find(item => item.name === name);
  }

  getItemByCategories(categories: categories) {
    return this.data.filter(item =>
      item.category.some(cat =>
        categories.includes(cat)
      )
    );
  }

  addItem(data: ItemData){
    this.data.push({
      id: uuidv4().toString(),
      name: data.name,
      description: data.description,
      picture: data.picture,
      price: data.price,
      in_stock: data.in_stock,
      stock_num: data.stock_num,
      category: data.category,
    });
    this.saveItem();
  }

  buyItem(id: string){
    const item = this.getItemById(id);
    console.log(`Stock before buying: ${item?.stock_num}`);
    if (item!.stock_num > 1){
      item!.stock_num--;
      console.log(`Stock after buying: ${item?.stock_num}`);
    } else if (item!.stock_num === 1){
      item!.stock_num--;
      item!.in_stock = false;
      console.log('Stocks gone')
    } else if (!item!.in_stock){
      console.log('Nothing to buy');
    }
  }

  constructor() {
    const items = localStorage.getItem('items');

    if (items){
      this.data = JSON.parse(items);
    }
  }

  private saveItem(){
    localStorage.setItem('items', JSON.stringify(this.data));
  }
}
