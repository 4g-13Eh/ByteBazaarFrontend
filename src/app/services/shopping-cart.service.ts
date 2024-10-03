import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private httpClient: HttpClient = inject(HttpClient);
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

  public getCartItems(cartId: string): Observable<ShoppingCartItemModel[]>{
    return this.httpClient.get<ShoppingCartItemModel[]>(`/api/carts/${cartId}`, { withCredentials: true });
  }

  public addItemToCart(cartId: string, itemId: string): Observable<void>{
    return this.httpClient.put<void>(`/api/carts/${cartId}`, {itemId}, {withCredentials: true})
      .pipe(tap(() => this.refreshCartItemCount(cartId)));
  }

  public removeItemFromCart(cartId: string, itemId: string): Observable<void>{
    return this.httpClient.delete<void>(`/api/carts/${cartId}/${itemId}`, {withCredentials: true})
      .pipe(tap(() => this.refreshCartItemCount(cartId)));
  }

  public clearCart(cartId: string): Observable<void>{
    return this.httpClient.delete<void>(`/api/carts/${cartId}`, {withCredentials: true})
      .pipe(tap(() => this.refreshCartItemCount(cartId)));
  }

  public getCartItemCount(cartId: string): Observable<number> {
    return this.httpClient.get<number>(`/api/carts/quantity/${cartId}`, {withCredentials: true});
  }

  public updateItemQuantity(cartId: string, itemId: string, newQuantity: number): Observable<void>{
    return this.httpClient.put<void>(`/api/carts/quantity/${cartId}/${itemId}`, newQuantity, {withCredentials: true})
      .pipe(tap(() => this.refreshCartItemCount(cartId)));
  }

  public refreshCartItemCount(cartId: string): void{
    this.getCartItemCount(cartId).subscribe({
      next: (count: number) => {
        console.log('Cart item count:', count)
        this.cartItemCountSubject.next(count);
      }
    });
  }
}
