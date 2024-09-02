import {
  CanActivate,
  Router,
} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import {UserService} from "../user/user.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  private userService = inject(UserService);
  private router = inject(Router)

  canActivate(): boolean {
    const isLoggedIn = this.userService.getCurrentUser() !== null;

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
