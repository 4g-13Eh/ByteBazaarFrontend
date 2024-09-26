import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {jwtDecode} from "jwt-decode";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);

  private token = inject(TokenService).getToken();
  public username = this.extractUsername(this.token);

  public getUserByEmail(){
    return this.httpClient.get<UserModel>(`http://localhost:8080/api/users/email/${this.username}`)
  }

  private extractUsername(token: string | null){
    if (!token) return;
    return jwtDecode(token).sub;
  }
}
