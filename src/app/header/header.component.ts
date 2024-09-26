import {Component, inject, OnInit,} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, CommonModule, Location} from "@angular/common";
import {ShoppingCartService} from "../services/shopping-cart.service";
import { Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";

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
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  location = inject(Location)
  private cartService = inject(ShoppingCartService);
  router = inject(Router);
  cartItemCount$!: Observable<number>;
  private tokenService = inject(TokenService);
  protected token = this.tokenService.getToken();

  authLinkText: string = 'Anmelden';

  ngOnInit() {
    // this.cartItemCount$ = this.cartService.getCartItemCount().asObservable();
    this.updateLinkText();

    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.updateLinkText();
      }
    });
  }

  onLogoutClick(){
    this.authService.logout();
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

