import { Observable } from 'rxjs';
import { IHomeService } from '../interfaces/home-service.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements IHomeService {
  apiBaseUrl = `${environment.apiBaseUrl}/home`;

  constructor(private httpClient: HttpClient) {}

  getHome(): Observable<any> {
    const url = `${this.apiBaseUrl}`;
    return this.httpClient.get(url);
  }
}
