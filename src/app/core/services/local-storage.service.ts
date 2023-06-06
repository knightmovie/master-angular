import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _store: Storage = window.localStorage;

  constructor() {}

  set(key: string, value: string): void {
    this._store.setItem(key, value);
  }

  get(key: string): string {
    return this._store.getItem(key) || null;
  }

  setObject(key: string, value: unknown): void {
    this._store.setItem(key, JSON.stringify(value));
  }

  getObject<T = unknown>(key: string): T | null {
    return JSON.parse(this._store.getItem(key) || null) as T;
  }

  remove(key: string): void {
    this._store.removeItem(key);
  }

  clear(): void {
    this._store.clear();
  }
}
