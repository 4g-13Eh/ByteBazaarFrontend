import {
  CanActivateFn,
  Router,
} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  const isLoggedIn = userService.getCurrentUser() !== null;

  if (!isLoggedIn){
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
}
