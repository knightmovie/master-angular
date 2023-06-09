import { RedirectService } from './../services/router.service';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStateService } from '../authentication/services/auth-state.service';
import { AuthenticationService } from '../authentication/services/authentication.service';

export const AuthenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authenService = inject(AuthenticationService);
  const redirectService = inject(RedirectService);
  if (authenService.isLoggedIn()) {
    return true;
  }
  redirectService.redirectLogin();
  return false;
};
