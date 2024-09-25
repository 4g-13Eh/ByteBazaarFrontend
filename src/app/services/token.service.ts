import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string | null = null;
  private httpClient = inject(HttpClient);
  private readonly TOKEN_KEY = 'accessToken';

  public setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    this.token = null;
    sessionStorage.removeItem(this.TOKEN_KEY)
  }

  refreshAccessToken(): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('http://localhost:8080/api/auth/refresh', {});
  }
}
