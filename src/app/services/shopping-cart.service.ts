import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private httpClient = inject(HttpClient);
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  public getCartItems(cartId: string): Observable<ShoppingCartItemModel[]>{
    return this.httpClient.get<ShoppingCartItemModel[]>(`http://localhost:8080/api/carts/${cartId}`);
  }

  public addItemToCart(cartId: string, itemId: string){
    return this.httpClient.put<void>(`http://localhost:8080/api/carts/${cartId}`, {itemId});
  }

  public removeItemFromCart(cartId: string, itemId: string){
    return this.httpClient.delete<void>(`http://localhost:8080/api/carts/${cartId}/${itemId}`);
  }

  public clearCart(cartId: string){
    return this.httpClient.delete<void>(`http://localhost:8080/api/carts/${cartId}`);
  }

  public getCartItemCount(cartId: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/api/carts/quantity/${cartId}`);
  }

  public updateItemQuantity(cartId: string, itemId: string, newQuantity: number){
    return this.httpClient.put<void>(`http://localhost:8080/api/carts/quantity/${cartId}/${itemId}`, newQuantity);
  }

  public refreshCartItemCount(cartId: string){
    this.getCartItemCount(cartId).subscribe({
      next: (count: number) => {
        console.log('Cart item count:', count)
        this.cartItemCountSubject.next(count);
      }
    });
  }
}
