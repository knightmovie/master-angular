import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export function CustomHttpInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const httpRequest =  request.clone({
    headers: request.headers
    .set('Content-Type', 'application/json ')
    .set('Accept', 'application/json'),
    withCredentials: true
  });
  return next(httpRequest)
}
