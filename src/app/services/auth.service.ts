import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupModel} from "../models/signup.model";
import {SigninModel} from "../models/signin.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);

  public signup(signupData: SignupModel) {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupData);
  }

  public signin(signupData: SigninModel) {
    return this.httpClient.post('http://localhost:8080/api/auth/signin', signupData);
  }

  public logout(token: string){
    return this.httpClient.post('http://localhost:8080/api/auth/signin', token);
  }

  public refreshToken(token: string){
    return this.httpClient.post('http://localhost:8080/api/auth/refresh', token);
  }
}
