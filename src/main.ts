import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, withComponentInputBinding, withRouterConfig} from "@angular/router";
import {routes} from "./app/app.routes";


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({
      paramsInheritanceStrategy: 'always'
    }))
  ]
})
  .catch((err)=> console.log(err))
