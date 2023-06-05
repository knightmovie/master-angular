import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationInterceptor } from './app/core/interceptors/authorization.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { AppRouting } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthorizationInterceptor])),
    CookieService,

    // provider to inject routes, preload all modules and trace route change events
    provideRouter(AppRouting, withPreloading(PreloadAllModules)),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  ],
});
