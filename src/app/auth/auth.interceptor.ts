import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).getToken()
  console.log(`Retrieved Token: ${token}`);

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
    return next(clonedRequest)
  } else {
    return next(req);
  }
};
