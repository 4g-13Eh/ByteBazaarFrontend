import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject, Injector, runInInjectionContext} from "@angular/core";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";
import {AuthService} from "../services/auth.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  if (req.url.includes('/api/auth/signup')
    || req.url.includes('/api/auth/signin')
    || req.url.includes('/api/auth/refresh')
    || req.url.includes('/api/auth/is-authenticated')) {
    return next(req);
  }

  return next(req).pipe(catchError(err => handleAuthError(err, req, next, authService)));
};

function handleAuthError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  if (err.status === 401) {
    return authService.refreshAccessToken().pipe(
      switchMap((newToken: JwtTokenModel) => {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
        });
        return next(clonedRequest);
      }),
      catchError((refreshError) => {
        console.error(`Token refresh failed: ${refreshError}`);
        return throwError(() => refreshError);
      })
    );
  }
  return throwError(() => err);
}
