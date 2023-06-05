import { IUserInformation } from '../interfaces/user-information.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, pluck, map } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { IAuthState } from '../interfaces/auth-state.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private static readonly TOKEN_ACCESS = 'mv_tok'
  private _value: IAuthState = {
    user: null,
    token: null,
    tokenExpiry: null
  };
  private _authStateSubject = new BehaviorSubject<IAuthState>(this._value);
  private _authState$ = this._authStateSubject.asObservable();

  constructor(private _localStorage: LocalStorageService) { }

  setAuthState(data: IAuthState) {
    this._value = data;
    this._authStateSubject.next(this._value);
    this._localStorage.set(AuthStateService.TOKEN_ACCESS, this._value.token);
  }

  getAuthState(): IAuthState {
    return this._value
  }

  subscribeGetAuthState(): Observable<IAuthState> {
    return this._authState$;
  }

  getToken(): string {
    return this._localStorage.get(AuthStateService.TOKEN_ACCESS)
  }

  getUserInformation(): Observable<IUserInformation> {
    return this._authState$.pipe(map(e => e.user))
  }


}
