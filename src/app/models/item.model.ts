import {categories} from "./category.model";

export interface ItemModel {
  id: string;
  name: string;
  description: string;
  picture?: string | HTMLImageElement | File // either urlstring, <img>-element or File from input
  price: number;
  in_stock: boolean;
  stock_num: number;
  category: categories;
}

export interface ItemData {
  name: string;
  description: string;
  picture?: string | HTMLImageElement | File // either urlstring, <img>-element or File from input
  price: number;
  in_stock: boolean;
  stock_num: number;
  category: categories;
}
