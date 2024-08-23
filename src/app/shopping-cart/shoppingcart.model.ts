import {ShoppingCartItemModel} from "./shopping-cart-item.model";

export interface ShoppingCartModel{
  id: string,
  items: ShoppingCartItemModel[],
}
