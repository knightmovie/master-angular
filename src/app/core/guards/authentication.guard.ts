import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/implementations/authentication.service';

export const AuthenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authenService = inject(AuthenticationService);
  if (authenService.isLogin()) {
    return true;
  }
  authenService.logOutAndRedirectToLogin();
  return false;
};
