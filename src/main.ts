import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading, } from '@angular/router';
import { AppRouting } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { CustomHttpInterceptor } from './app/core/interceptors/custom-interceptor.service';
import { AuthHttpInterceptor } from './app/core/interceptors/auth-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideRouter(AppRouting),
    provideHttpClient(
      withInterceptors([CustomHttpInterceptor, AuthHttpInterceptor]))
  ],
});
