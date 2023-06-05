import { Observable } from 'rxjs';
import { LoginResultViewModel } from 'src/app/shares/view-models/login-result.view-model';
import { LoginViewModel } from 'src/app/shares/view-models/login.view-model';
export interface IAuthenticationService {
  logIn(model: LoginViewModel): Observable<LoginResultViewModel>;
  register(model: LoginViewModel): Observable<LoginResultViewModel>;
  logOut(): Observable<any>;
  isLogin(): boolean;
  refreshAccessToken(): Observable<any>;
}
