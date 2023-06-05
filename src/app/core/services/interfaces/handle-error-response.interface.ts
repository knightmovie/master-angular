import { HttpErrorResponse } from '@angular/common/http';

export interface IHandleErrorResponseService {
  handleError(err: HttpErrorResponse): void;
}
