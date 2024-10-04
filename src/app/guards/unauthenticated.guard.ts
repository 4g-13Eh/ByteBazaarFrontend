import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {catchError, of, switchMap} from "rxjs";

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated().pipe(
    switchMap((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        router.navigate(['/']);
        return of(false);
      }
      return of(true);
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(true);
    })
  );
};
