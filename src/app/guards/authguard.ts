import {
  CanActivateFn,
  Router,
} from "@angular/router";
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const AuthGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const token: string | null = inject(TokenService).getToken();

  if (!token){
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
}

