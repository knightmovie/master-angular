import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private _router: Router) { }


  navigate(commands: any[], extras: NavigationExtras = { skipLocationChange: false }) {
    this._router.navigate(commands, extras);
  }

  navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): void {
     this._router.navigateByUrl(url, extras);
  }

  get url(): string {
    return this._router.url;
  }

  redirectLogin() {
    this.navigate(['/login'])
  }

  redirectAuthorize() {
    this.navigate(['/not-authorized'])
  }
}
