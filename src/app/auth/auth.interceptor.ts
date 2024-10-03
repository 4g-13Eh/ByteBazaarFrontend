import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject, Injector, runInInjectionContext} from "@angular/core";
import {TokenService} from "../services/token.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";
import {AuthService} from "../services/auth.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const injector: Injector = inject(Injector);

  return runInInjectionContext(injector, () => {
    const tokenService: TokenService = inject(TokenService);
    const token: string | null = tokenService.getToken();

    if (req.url.includes('/api/auth/signup')
      || req.url.includes('/api/auth/signin')
      || req.url.includes('/api/auth/refresh')) {
      return next(req);
    }

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next(clonedRequest).pipe(
        catchError(err => handleAuthError(err, req, next, injector))
      );
    } else {
      return next(req).pipe(
        catchError(err => handleAuthError(err, req, next, injector))
      );
    }
  });
};

function handleAuthError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandlerFn, injector: Injector): Observable<HttpEvent<any>> {
  if (err.status === 401) {
    return runInInjectionContext(injector, () => {
      const authService: AuthService = inject(AuthService);
      const tokenService: TokenService = inject(TokenService);

      return authService.refreshAccessToken().pipe(
        switchMap((newToken: JwtTokenModel) => {
          const clonedResquest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
          });
          tokenService.setToken(newToken.token);
          return next(clonedResquest);
        }),
        catchError((refreshError) => {
          console.error(`Token refresh failed: ${refreshError}`);
          return throwError(() => refreshError);
        })
      );
    });
  }
  return throwError(() => err);
}
