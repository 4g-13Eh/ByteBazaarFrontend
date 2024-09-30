import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private httpClient = inject(HttpClient);
  private token!: string | null;

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string | null {
    return this.token;
  }

  public clearToken(): void {
    this.token = null;
  }

  public refreshAccessToken(): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('http://localhost:8080/api/auth/refresh', {});
  }
}
