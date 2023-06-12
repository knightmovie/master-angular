import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this._loadingSubject.asObservable();
  constructor() {

  }

  private _setLoading(value: boolean) {
    this._loadingSubject.next(value);
  }

  start() {
    this._setLoading(true);
  }

  stop() {
    this._setLoading(false)
  }

  get loading(): boolean {
    return this._loadingSubject.getValue();
  }


}
