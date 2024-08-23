import { Injectable } from '@angular/core';
import {UserModel} from "./user.model";
import { v4 as uuidv4 } from "uuid";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersKey = 'users';

  constructor() { }

  createUser(email: string, password: string): UserModel {
    const newUser: UserModel = {
      id: uuidv4().toString(),
      email: email,
      password: password,
      cartId: null,
    };

    let users: UserModel[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));

    return newUser;
  }

  updateUser(user: UserModel) {
    let users: UserModel[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    users = users.map(u => (u.id === user.id ? user : u));
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getUserByEmail(email: string): UserModel | undefined {
    const users: UserModel[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    return users.find(user => user.email === email);
  }

  getUsers(): UserModel[] {
    const users: UserModel[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    return users;
  }

  getCurrentUser(): UserModel | null {
    const currentUserId = localStorage.getItem('currentUser');
    if (!currentUserId) return null;

    const users: UserModel[] = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.id === currentUserId) || null;
  }
}
