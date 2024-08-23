import {Component, OnInit} from '@angular/core';
import {UserModel} from "./user.model";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentUser: UserModel | null = null;

  ngOnInit() {
    const currentUserId = localStorage.getItem('currentUser');
    if (currentUserId) {
      const users: UserModel[] = JSON.parse(localStorage.getItem('users') || '[]');
      this.currentUser = users.find(user => user.id === currentUserId) || null;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
