import {Category} from "./category.model";

export interface ItemModel {
  itemId: string;
  name: string;
  description: string;
  picture: string
  price: number;
  in_stock: boolean;
  stock_num: number;
  categories: Category[];
}
