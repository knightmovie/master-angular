import { RedirectService } from './../../services/router.service';
import { LoggerService } from './../../services/logger.service';
import { shareReplay, tap, catchError, throwError, of, map, Observable, switchMap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { Injectable } from '@angular/core';
import { AuthStateService } from './auth-state.service';
import { IAuthRequest } from '../interfaces/auth-request.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { IAuthResponse } from '../interfaces/auth-response.interface';
import { IAuthState } from '../interfaces/auth-state.interface';
import { CodeService, ResponseStatus } from '../../interfaces';
import { ErrorResponse } from '../../interfaces/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _apiAuth: AuthApiService,
    private _authState: AuthStateService,
    private _logger: LoggerService,
    private _redirectService: RedirectService) {
  }

  login(request: IAuthRequest): Observable<ResponseStatus> {
    return this._apiAuth.login(request).pipe(
      tap((respone: IAuthResponse) => {
        this._logger.debug('Login response', respone);
        const authState = this._parseAuthState(respone);
        this._authState.setAuthState(authState);
        this._redirectService.navigate(['/home']);
      }),
      map(_ => {
        return  {code: CodeService.SUCCESS, message: 'Loggin success'};
      }),
      catchError((err: ErrorResponse)  => {
        const response: ResponseStatus = {code: err.code, message: err.message};
        return of(response);
      })
    )
  }

  refreshToken(): Observable<unknown>{
    return this._apiAuth.refreshToken().pipe(
      tap((respone: IAuthResponse) => {
        this._authState.setAuthState(this._parseAuthState(respone));
      }),
    )
  }

  logout() {
    this._apiAuth.logout().pipe(tap(e => this._logger.debug('Logout', e))).subscribe();
    this._authState.reset();
    this._redirectService.redirectLogin();
  }

  isLoggedIn(): boolean {
    return this._authState.isLoggedIn();
  }


  private _parseAuthState(data: IAuthResponse): IAuthState {
    return {
      user: data.userInfo,
      token: data.accessToken,
      tokenExpiry: data.accessToken.expiresIn,
      roles: data.roles
    }
  }
}
