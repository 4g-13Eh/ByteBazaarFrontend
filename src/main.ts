/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, withComponentInputBinding, withRouterConfig} from "@angular/router";
import {routes} from "./app/app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {AuthInterceptor} from "./app/auth/auth.interceptor";


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always'})
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
  .catch((err)=> console.log(err))
