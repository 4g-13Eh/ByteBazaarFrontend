import {Component, inject, OnDestroy, OnInit,} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, CommonModule, Location} from "@angular/common";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthService} from "../../services/auth.service";
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
  protected cartItemCount$: Observable<number> = this.cartService.cartItemCount$;
  private subs: Subscription[] = [];
  protected authLinkText!: string;
  protected isAuthenticated: boolean = false;

  ngOnInit() {
    this.updateLinkText();
    this.subs.push(this.authService.isAuthenticated().subscribe({
      next: (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.loadUserData();
        }
        this.updateLinkText();
      }
    }));

    this.subs.push(this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
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

  protected onLogoutClick(): void{
    this.subs.push(this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/signin']).then(()=>{
          this.updateLinkText();
        });
      }
    }));
  }

  private updateLinkText(): void {
    if (this.isAuthenticated){
      this.authLinkText = 'Logout'
    } else if (this.location.isCurrentPathEqualTo('/auth/signin')) {
      this.authLinkText = 'Registrieren';
    } else if (this.location.isCurrentPathEqualTo('/auth/signup')) {
      this.authLinkText = 'Anmelden';
    }
  }

  private loadUserData() {
    this.subs.push(this.userService.getCurrentUser().subscribe({
      next: (data: UserModel) => {
        this.cartId = data.cartId;
        if (this.cartId) {
          this.cartService.refreshCartItemCount(this.cartId);
        }
      }
    }));
  }
}
