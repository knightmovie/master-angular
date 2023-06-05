import { Observable } from 'rxjs';

export interface IHomeService {
  getHome(): Observable<any>;
}
