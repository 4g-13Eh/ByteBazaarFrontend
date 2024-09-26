import {
  CanActivateFn,
  Router,
} from "@angular/router";
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = inject(TokenService).getToken();

  if (!token){
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
}

