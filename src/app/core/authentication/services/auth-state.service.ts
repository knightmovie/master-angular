import { IUserInformation } from '../interfaces/user-information.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, pluck, map } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { IAuthState } from '../interfaces/auth-state.interface';

const DEFAULT_STATE: IAuthState = {
  user: null,
  token: null,
  tokenExpiry: null,
  roles: []
};

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private static readonly TOKEN_ACCESS = 'mv_tok'
  private _value: IAuthState = DEFAULT_STATE;
  private _authStateSubject = new BehaviorSubject<IAuthState>(this._value);
  private _authState$ = this._authStateSubject.asObservable();

  private _tokenSubject = new BehaviorSubject<String>(null);
  private _token$ = this._tokenSubject.asObservable();

  constructor(private _localStorage: LocalStorageService) { }

  setAuthState(data: IAuthState) {
    this._value = data;
    this._localStorage.set(AuthStateService.TOKEN_ACCESS, data.token);
    this._authStateSubject.next(this._value);
    if (data !== null) {
      this.setToken(data.token)
    }
  }

  get authState(): IAuthState {
    return this._value
  }

  get authState$(): Observable<IAuthState> {
    return this._authState$;
  }

  get token$(): Observable<String> {
    return this._token$;
  }

  setToken(token: string) {
    this._tokenSubject.next(token);
  }

  reset() {
    this.setAuthState(DEFAULT_STATE);
    this._localStorage.remove(AuthStateService.TOKEN_ACCESS)
  }


  getToken(): string {
    return this._localStorage.get(AuthStateService.TOKEN_ACCESS)
  }

  get roles() {
    return this._value.roles;
  }

  get roles$() {
    return this._authState$.pipe(map(e => e.roles))
  }

  get user$(): Observable<IUserInformation> {
    return this._authState$.pipe(map(e => e.user))
  }


  isLoggedIn(): boolean {
    if (this._localStorage.get(AuthStateService.TOKEN_ACCESS)) {
      return true;
    }
    return false;
  }
}
