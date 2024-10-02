import {
  HttpErrorResponse,
  HttpHandler,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject, Injector, runInInjectionContext} from "@angular/core";
import {TokenService} from "../services/token.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);

  const tokenService: TokenService = inject(TokenService);
  const token: string | null = tokenService.getToken();

  if (req.url.includes('/api/auth/signup') ||
    req.url.includes('/api/auth/signin') ||
    req.url.includes('/api/auth/refresh')){
    return next(req);
  }

  if (token){
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    });
    return next(clonedRequest).pipe(catchError(err => handleAuthError(err, req, next, injector)))
  } else {
    return next(req).pipe(catchError(err => handleAuthError(err, req, next, injector)));
  }
};

function handleAuthError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandlerFn, injector: Injector): Observable<any> {
  if (err.status === 401) {
    return runInInjectionContext(injector, () => {
      const authService = inject(TokenService);

      return authService.refreshAccessToken().pipe(
        switchMap((newToken: JwtTokenModel) => {
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken.token}`,
            },
          });
          return next(clonedRequest);
        }),
        catchError((refreshError) => {
          console.error('Token refresh failed', refreshError);
          return throwError(refreshError);
        })
      );
    });
  }
  return throwError(err);
}
