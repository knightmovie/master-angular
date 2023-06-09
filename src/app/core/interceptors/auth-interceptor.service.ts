import { RedirectService } from './../services/router.service';
import { HttpStatusCode } from './../http/code-http.enum';
import { AuthApiService } from './../authentication/services/auth-api.service';
import { AuthStateService } from './../authentication/services/auth-state.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, filter, Observable, of, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from '../authentication/services/authentication.service';


let isRefreshing = false;
let authStateService: AuthStateService;
let authService: AuthenticationService;
let redirectService: RedirectService;


export function AuthHttpInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  authStateService = inject(AuthStateService);
  authService = inject(AuthenticationService);
  redirectService = inject(RedirectService);

  const token = authStateService.getToken();
  if (token) {
    request = addTokenHeader(request, token)
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
    return handleUnAuthorized(request, next, error)
  } else if (error.status === HttpStatusCode.FORBIDDEN) {
    redirectService.redirectAuthorize();
    return throwError(() => error);
  }

  return throwError(() => error);
}


function handleUnAuthorized(request: HttpRequest<any>, next: HttpHandlerFn, error: HttpErrorResponse) {
  if (!isRefreshing) {
    isRefreshing = true;
    if (authService.isLoggedIn()) {
      authStateService.setToken(null);
      return authService.refreshToken().pipe(
        switchMap(_ => {
          isRefreshing = false;
          const token = authStateService.getToken();
          return next(addTokenHeader(request, token));
        }),
        catchError(e => {
          isRefreshing = false;
          redirectService.redirectLogin();
          return throwError(() => e);
        })
      )
    } else {
      return throwError(() => error);
    }
  }

  // If refresh token already, wait new access token
  return authStateService.token$.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token => {
      return next(addTokenHeader(request, token as string))
    })
  )
}


function addTokenHeader(request: HttpRequest<any>, token: string) {
  return request.clone({
    headers: request.headers.set('Authorization', 'Bearer ' + token),
  });
}
