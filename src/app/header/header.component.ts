import {ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, CommonModule, Location} from "@angular/common";
import {ShoppingCartService} from "../services/shopping-cart.service";
import { Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";
import {ShoppingCartItemModel} from "../models/shopping-cart-item.model";

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
export class HeaderComponent implements OnInit, OnChanges{
  private authService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private location = inject(Location)
  protected cartService = inject(ShoppingCartService);
  private cartId = '';
  private router = inject(Router);
  private tokenService = inject(TokenService);
  protected token = this.tokenService.getToken();
  cartitemCount!: number;
  cartItemCount$ = this.cartService.cartItemCount$;


  protected authLinkText: string = 'Anmelden';

  ngOnInit() {
    this.userService.getUserByEmail().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId
        console.log(`CartId: ${this.cartId}`);
        if (this.cartId) {
          // console.log(`count: ${this.cartService.cartItemCount$}`)
          // this.cartService.cartItemCount$.subscribe({
          //   next: (data) => {
          //     this.cartitemCount = data;
          //   }
          // })
          this.cartService.refreshCartItemCount(this.cartId)
        }
      }
    });
    this.updateLinkText();

    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.updateLinkText();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
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

