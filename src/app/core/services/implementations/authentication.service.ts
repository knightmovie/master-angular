// import { Observable, from, tap } from 'rxjs';
// import { LoginResultViewModel } from 'src/app/shares/view-models/login-result.view-model';
// import { LoginViewModel } from 'src/app/shares/view-models/login.view-model';
// import { IAuthenticationService } from '../interfaces/authentication-service.interface';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../../environments/environment'; // sau nay sẽ set config tự động lấy url dựa theo evironment-> truoc mat dung o local
// import { Router } from '@angular/router';
// import { HttpService } from '../http.service';
// import { TokenService } from './token.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthenticationService implements IAuthenticationService {
//   apiBaseUrl = `${environment.apiBaseUrl}/users`;

//   isAuthenticated: boolean = false;

//   public constructor(
//     private HttpClient: HttpClient,
//     private router: Router,
//     private tokenService: TokenService
//   ) {}

//   logIn(model: LoginViewModel): Observable<LoginResultViewModel> {
//     // ma hoa body
//     const headers: HttpHeaders = new HttpHeaders({
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Accept: 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     });

//     const fullUrl = `${this.apiBaseUrl}/login`;

//     const body = new URLSearchParams();
//     body.set('grant_type', 'password');
//     body.set('username', model.username);
//     body.set('password', model.password);

//     return this.HttpClient.post<LoginResultViewModel>(
//       fullUrl,
//       body.toString(),
//       {
//         headers,
//       }
//     );
//   }

//   logOutAndRedirectToLogin() {
//     this.logOut().subscribe((re) => {
//       this.tokenService.deleteAccessToken();
//       this.router.navigate(['/login']);
//     });
//   }

//   register(model: LoginViewModel): Observable<LoginResultViewModel> {
//     const headers = new HttpHeaders().set(
//       'Content-Type',
//       'application/x-www-form-urlencoded'
//     );
//     console.log(model);
//     const fullUrl = `${this.apiBaseUrl}/register`;

//     const body = new URLSearchParams();
//     body.set('grant_type', 'password');
//     body.set('username', model.username);
//     body.set('password', model.password);

//     return this.HttpClient.post<LoginResultViewModel>(
//       fullUrl,
//       body.toString(),
//       {
//         headers,
//       }
//     );
//   }

//   logOut(): Observable<any> {
//     return this.HttpClient.get(`${this.apiBaseUrl}/logout`);
//   }

//   isLogin() {
//     const accessToken = this.tokenService.getAccessToken();
//     const token = this.tokenService.decodeToken(accessToken);
//     if (token) {
//       console.log('Toekn expired ', token.exp > Date.now() / 1000);
//       return token.exp > Date.now() / 1000;
//     }
//     return false;
//   }

//   refreshAccessToken(): Observable<any> {
//     const url = `${environment.apiBaseUrl}/refresh`;
//     return this.HttpClient.get(url).pipe(
//       tap((response: any) => {
//         const newAccessToken = response;
//         this.tokenService.storeAccessToken(newAccessToken);
//       })
//     );
//   }
// }
