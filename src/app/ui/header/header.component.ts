import {Component, inject, OnDestroy, OnInit,} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, CommonModule, Location} from "@angular/common";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Observable, Subscription} from "rxjs";

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
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private location: Location = inject(Location)
  protected cartService: ShoppingCartService = inject(ShoppingCartService);
  private cartId: string = '';
  private router: Router = inject(Router);
  protected tokenService: TokenService = inject(TokenService);
  protected token: string | null = this.tokenService.getToken();
  protected cartItemCount$: Observable<number> = this.cartService.cartItemCount$;
  private subs: Subscription[] = [];
  protected authLinkText!: string;

  ngOnInit() {
    this.updateLinkText();
    if (this.tokenService.getToken()){
      this.subs.push(this.userService.getUserByEmail().subscribe({
        next: (data: UserModel) => {
          this.cartId = data.cartId
          if (this.cartId) {
            this.cartService.refreshCartItemCount(this.cartId)
          }
        }
      }));
    }
    this.subs.push(this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.token = this.tokenService.getToken();
        this.updateLinkText();
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      console.log(sub)
      sub.unsubscribe()
    })
  }

  protected onLogoutClick(){
    this.subs.push(this.authService.logout().subscribe({
      next: () => {
        this.tokenService.clearToken();
        this.token = null;
        this.router.navigate(['/auth/signin']).then(()=>{
          this.updateLinkText();
        });
      }
    }));
  }

  private updateLinkText() {
    const currentToken = this.tokenService.getToken();

    if (currentToken){
      this.authLinkText = 'Logout'
    } else if (this.location.isCurrentPathEqualTo('/auth/signin')) {
      this.authLinkText = 'Registrieren';
    } else if (this.location.isCurrentPathEqualTo('/auth/signup')) {
      this.authLinkText = 'Anmelden';
    }
  }
}
