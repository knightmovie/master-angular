import { RouterService } from './../services/router.service';
import { HttpStatusCode } from './../http/code-http.enum';
import { AuthApiService } from './../authentication/services/auth-api.service';
import { AuthStateService } from './../authentication/services/auth-state.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, EMPTY, Observable, switchMap, throwError } from "rxjs";
import { AuthenticationService } from '../authentication/services/authentication.service';


let isRefreshing = false;

let authStateService: AuthStateService;
let authService: AuthenticationService;
let routerService: RouterService;

export function AuthHttpInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  authStateService = inject(AuthStateService);
  authService = inject(AuthenticationService);
  routerService = inject(RouterService)

  const token = authStateService.getToken();
  if (token) {
    const headers = request.headers;
    headers.set('Authorization', `Authorization token ${token}`);
    request = request.clone({ headers });
  }

  return next(request).pipe(
    catchError((error) => {

      if (error instanceof HttpErrorResponse) {
        return handleHttpErrorResponse(request, next, error)
      }

      return throwError(() => error)
    })
  )
}


function handleHttpErrorResponse(request: HttpRequest<any>, next: HttpHandlerFn, error: HttpErrorResponse): Observable<HttpEvent<unknown>> {
  if (error.status === HttpStatusCode.UNAUTHORIZED) {
    return handleUnAuthorized(request, next,)
  }

  return next(request);
}


function handleUnAuthorized(request: HttpRequest<any>, next: HttpHandlerFn) {
  if (isRefreshing) return next(request);;
  isRefreshing = true;
  if (authService.isLoggedIn()) {
    return authService.refreshToken().pipe(
      switchMap(_ => {
        isRefreshing = false;
        return next(request);
      }),
      catchError(e => {
        routerService.redirectLogin();
        return throwError(() => e);
      })
    )
  }

  return next(request);
}
