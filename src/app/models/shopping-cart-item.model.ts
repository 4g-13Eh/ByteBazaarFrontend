import {ItemModel} from "./item.model";
import {ShoppingCartModel} from "./shoppingcart.model";

export interface ShoppingCartItemModel{
  id: string,
  cart: ShoppingCartModel,
  cartItem: ItemModel,
  quantity: number;
}
