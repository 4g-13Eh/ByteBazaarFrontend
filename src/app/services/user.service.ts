import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);

  public getCurrentUser(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`/api/users/currentUser`, { withCredentials: true })
  }
}
