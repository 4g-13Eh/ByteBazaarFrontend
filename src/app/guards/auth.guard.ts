import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, of, switchMap} from "rxjs";

export const AuthGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

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
