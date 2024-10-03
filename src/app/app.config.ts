import { ApplicationConfig } from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import { routes } from './routes/app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always'})
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([AuthInterceptor]),
    ),
  ]
};
