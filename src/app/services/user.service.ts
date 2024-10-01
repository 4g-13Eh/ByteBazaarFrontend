import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {jwtDecode} from "jwt-decode";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);
  private tokenService: TokenService = inject(TokenService);

  public getUserByEmail(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`http://localhost:8080/api/users/email/${this.extractUsername()}`)
  }

  private extractUsername(): string | undefined {
    const token: string | null = this.tokenService.getToken();
    if (!token) return;
    console.log(`useremail: ${jwtDecode(token).sub}`)
    return jwtDecode(token).sub;
  }
}
