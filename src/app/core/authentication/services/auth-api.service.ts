import { Observable, tap } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth-response.interface';
import { IAuthRequest } from '../interfaces/auth-request.interface';
import { Injectable } from '@angular/core';
import { HttpBase } from '../../http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private _httpBase: HttpBase) { }

  login(request: IAuthRequest): Observable<IAuthResponse> {
    return this._httpBase.post<IAuthRequest, IAuthResponse>('auth/login',  request)
  }

  logout() {
    return this._httpBase.get<unknown>('auth/logout');
  }

  refreshToken(): Observable<IAuthResponse> {
    return this._httpBase.get<IAuthResponse>('auth/refresh');
  }


}
