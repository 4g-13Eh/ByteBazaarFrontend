import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, of, switchMap} from "rxjs";

export const AuthenticatedGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated().pipe(
    switchMap((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/signin']);
        return of(false);
      }
      return of(true);
    }),
    catchError(() => {
      router.navigate(['/auth/signin']);
      return of(false);
    })
  );
};
