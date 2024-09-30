import {Component, inject, OnDestroy, OnInit,} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, CommonModule, Location} from "@angular/common";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private location = inject(Location)
  protected cartService = inject(ShoppingCartService);
  private cartId = '';
  private router = inject(Router);
  private tokenService = inject(TokenService);
  protected token = this.tokenService.getToken();
  protected cartItemCount$ = this.cartService.cartItemCount$;
  private subs: Subscription[] = [];


  protected authLinkText: string = 'Anmelden';

  ngOnInit() {
    this.subs.push(this.userService.getUserByEmail().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId
        if (this.cartId) {
          this.cartService.refreshCartItemCount(this.cartId)
        }
      }
    }));

    this.updateLinkText();

    this.subs.push(this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.updateLinkText();
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  onLogoutClick(){
    this.subs.push(this.authService.logout().subscribe());
    this.tokenService.clearToken();
    this.router.navigate(['/auth/signin']).then(()=>{
      this.updateLinkText();
    });
  }

  updateLinkText() {
    if (this.token){
      this.authLinkText = 'Logout'
    } else if (this.location.isCurrentPathEqualTo('/auth/signin')) {
      this.authLinkText = 'Registrieren';
    } else if (this.location.isCurrentPathEqualTo('/auth/signup')) {
      this.authLinkText = 'Anmelden';
    } else {
      this.authLinkText = 'Anmelden';
    }
  }
}

