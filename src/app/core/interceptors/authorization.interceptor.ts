// import {
//   HttpClient,
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandlerFn,
//   HttpRequest,
// } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { TokenService } from '../services/implementations/token.service';
// import { Observable, catchError, switchMap, throwError } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { AuthenticationService } from '../services/implementations/authentication.service';

// let refresh = false;

// export function AuthorizationInterceptor(
//   request: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> {
//   const tokenService = inject(TokenService);
//   const httpClient = inject(HttpClient);
//   const authenService = inject(AuthenticationService);

//   const accessToken = tokenService.getAccessToken();
//   if (accessToken) {
//     request = addToken(request, accessToken);
//   }

//   return next(request).pipe(
//     catchError((err: HttpErrorResponse) => {
//       if (err.status === 403 && !refresh) {
//         refresh = true;
//         const url = `${environment.apiBaseUrl}/refresh`;
//         return httpClient.get(url).pipe(
//           switchMap((res: any) => {
//             const newAccessToken = res.accessToken;
//             tokenService.storeAccessToken(newAccessToken);

//             request = addToken(request, newAccessToken);
//             return next(request);
//           }),
//           catchError((error) => {
//             authenService.logOutAndRedirectToLogin();
//             return throwError(() => error);
//           })
//         ) as Observable<HttpEvent<unknown>>;
//       }

//       refresh = false;
//       return throwError(() => err);
//     })
//   );
// }

// function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
//   return request.clone({
//     setHeaders: {
//       authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
//   });
// }
