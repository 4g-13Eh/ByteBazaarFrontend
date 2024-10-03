import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupModel} from "../models/signup.model";
import {SigninModel} from "../models/signin.model";
import {JwtTokenModel} from "../models/jwtToken.model";
import {Observable, } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  public signup(signupData: SignupModel): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('/api/auth/signup', signupData);
  }

  public signin(signinData: SigninModel): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('/api/auth/signin', signinData);
  }

  public logout(): Observable<void> {
    return this.httpClient.post<void>('/api/auth/logout', {}, { withCredentials: true });
  }

  public refreshAccessToken(): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('/api/auth/refresh', {}, { withCredentials: true });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<boolean>(`/api/auth/is-authenticated`);
  }
}
