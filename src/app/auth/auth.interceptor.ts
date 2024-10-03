import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {inject, } from "@angular/core";
import {TokenService} from "../services/token.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {JwtTokenModel} from "../models/jwtToken.model";
import {AuthService} from "../services/auth.service";

export class AuthInterceptor implements HttpInterceptor {

  private tokenService: TokenService = inject(TokenService);
  private authService: AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.tokenService.getToken();

    if (req.url.includes('/api/auth/signup')
      || req.url.includes('/api/auth/signin')
      || req.url.includes('/api/auth/refresh')) {
      return next.handle(req);
    }

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(clonedRequest).pipe(
        catchError(err => this.handleAuthError(err, req, next))
      );
    } else {
      return next.handle(req).pipe(
        catchError(err => this.handleAuthError(err, req, next))
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (err.status === 401) {
      return this.authService.refreshAccessToken().pipe(
        switchMap((newToken: JwtTokenModel) => {
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
          });
          this.tokenService.setToken(newToken.token);
          return next.handle(clonedRequest);
        }),
        catchError(refreshError => {
          console.error(`Token refresh failed: ${refreshError}`);
          return throwError(refreshError);
        })
      );
    }
    return throwError(err)
  }
}
