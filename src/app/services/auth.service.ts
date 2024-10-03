import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupModel} from "../models/signup.model";
import {SigninModel} from "../models/signin.model";
import {JwtTokenModel} from "../models/jwtToken.model";
import {Observable, tap} from "rxjs";
import {TokenService} from "./token.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private tokenService: TokenService = inject(TokenService)

  public signup(signupData: SignupModel): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('/api/auth/signup', signupData)
      .pipe(
        tap(
          (res: JwtTokenModel) => {this.tokenService.setToken(res.token)}
        )
      );
  }

  public signin(signinData: SigninModel): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('/api/auth/signin', signinData)
      .pipe(
        tap(
          (res: JwtTokenModel) => {this.tokenService.setToken(res.token)}
        )
      );
  }

  public logout(): Observable<JwtTokenModel> {
    const token = this.tokenService.getToken();
    return this.httpClient.post<JwtTokenModel>('/api/auth/logout', {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(tap(()=> this.tokenService.clearToken()));
  }

  public refreshAccessToken(): Observable<JwtTokenModel> {
    return this.httpClient.post<JwtTokenModel>('/api/auth/refresh', {}, { withCredentials: true });
  }
}
