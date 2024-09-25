import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token){
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}

