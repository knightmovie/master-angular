import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { BaseErrorResponse } from "../interfaces/error-response";



@Injectable({providedIn: 'root'})
export class HttpBase {
  private _baseURL: string;

  constructor(private _httpClient: HttpClient) {
    this._baseURL = environment.apiBaseUrl;
  }

  get<T>(url: string, params: {[key: string]: any} = {}, retryCount: number = 1, options: {[key: string]: any}= {}): Observable<T> {
    return this._httpClient.get<T>(this._buildURL(url), this._requestOptions(params, options)).pipe(
      retry(retryCount),
      catchError(e => this._handleError(e)),
    )
  }

  post<U, T>(url: string, data: U,  params:{[key: string]: any} = {}, retryCount: number = 1,  options: {[key: string]: any} = {}): Observable<T> {
    return this._httpClient.post<T>(this._buildURL(url), data, this._requestOptions(params, options)).pipe(
      retry(retryCount),
      catchError(e => this._handleError(e)),
    )
  }

  delete<U, T>(url: string, id: U,  params = {}, retryCount: number =  1,  options: {[key: string]: any}= {}): Observable<T> {
    const urlQuery = `${this._buildURL(url)}${id}`;
    return this._httpClient.delete<T>(urlQuery, this._requestOptions(params, options)).pipe(
      retry(retryCount),
      catchError(e => this._handleError(e)),
    )
  }

  put<T>(url: string, data: T, params = {}, retryCount: number =  1,  options: {[key: string]: any}= {}): Observable<T> {
    return this._httpClient.put<T>(this._buildURL(url), data, this._requestOptions(params, options)).pipe(
      retry(retryCount),
      catchError(e => this._handleError(e)),
    )
  }


  private _buildURL(url: string) {
    return `${this._baseURL}/${url}`
  }


  private _requestOptions(params: any, options: {[key: string]: any}): {[key: string]: any} {
    let tmpOption = options;
    if (!tmpOption) {
      tmpOption = {};
    }

    if (!tmpOption['headers']) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });
      tmpOption['headers'] = headers;
    }

    tmpOption['withCredentials'] = true;
    tmpOption['params'] = params;
    return tmpOption;
  }

  private _handleError(err: HttpErrorResponse) {
    const baseError = new BaseErrorResponse(err);
    return throwError(() => baseError)
  }
}
