import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly TOKEN_KEY = 'accessToken';

  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public refreshAccessToken(): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('http://localhost:8080/api/auth/refresh', {});
  }
}
