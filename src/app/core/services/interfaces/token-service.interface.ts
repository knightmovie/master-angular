export interface ITokenService {
  storeAccessToken(token: string): void;
  storeRefreshToken(token: string): void;
  getAccessToken(): any;
  getRefreshToken(): any;
  deleteAccessToken(): void;
  deleteRefreshToken(): void;

  cookieAccessToken(token: string): void;
  cookieRefreshToken(token: string): void;
  getCookieAccessToken(): any;
  getCookieRefreshToken(): any;
  deleteCookieAccessToken(): void;
  deleteCookieRefreshToken(): void;
  deleteAllCooikeToken(): void;

  decodeToken(token: string): any;
}
