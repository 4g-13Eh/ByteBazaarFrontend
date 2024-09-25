import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  constructor() {
    console.log('AuthInterceptor created')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    console.log(`Retrieved Token: ${token}`)

    if (token){
      const clonedRequest = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}

