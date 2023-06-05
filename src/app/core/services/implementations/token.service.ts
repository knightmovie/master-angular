import { Injectable } from '@angular/core';
import { ITokenService } from '../interfaces/token-service.interface';
import { TOKEN_TYPE } from '../../../shares/constants/token.constant';
// import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class TokenService implements ITokenService {
  constructor(
    // private Cookie: CookieService
    ) {}
  storeAccessToken(token: string) {
    localStorage.setItem(TOKEN_TYPE.ACCESS_TOKEN, token);
  }
  storeRefreshToken(token: string) {
    localStorage.setItem(TOKEN_TYPE.REFRESH_TOKEN, token);
  }

  getAccessToken(): any {
    return localStorage.getItem(TOKEN_TYPE.ACCESS_TOKEN);
  }

  getRefreshToken(): any {
    return localStorage.getItem(TOKEN_TYPE.REFRESH_TOKEN);
  }
  deleteAccessToken = () => {
    localStorage.removeItem(TOKEN_TYPE.ACCESS_TOKEN);
  };
  deleteRefreshToken = () => {
    localStorage.removeItem(TOKEN_TYPE.REFRESH_TOKEN);
  };

  cookieAccessToken(token: string) {
    // this.Cookie.set(TOKEN_TYPE.ACCESS_TOKEN, token);
  }

  cookieRefreshToken(token: string) {
    // this.Cookie.set(TOKEN_TYPE.REFRESH_TOKEN, token);
  }

  getCookieAccessToken(): any {
    // let accessToken = this.Cookie.get(TOKEN_TYPE.ACCESS_TOKEN);
    // return accessToken;
    return null;
  }

  getCookieRefreshToken(): any {
    // let refreshToken = this.Cookie.get('jwt');
    // return refreshToken;
    return null;
  }

  deleteCookieAccessToken = () => {
    // this.Cookie.delete(TOKEN_TYPE.ACCESS_TOKEN);
  };
  deleteCookieRefreshToken = () => {
    // this.Cookie.delete(TOKEN_TYPE.REFRESH_TOKEN);
  };

  deleteAllCooikeToken() {
    // this.Cookie.deleteAll('http://localhost:4200');
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return null;
    }
  }
}
