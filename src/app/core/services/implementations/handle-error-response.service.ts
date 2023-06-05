import { HttpErrorResponse } from '@angular/common/http';
import { IHandleErrorResponseService } from '../interfaces/handle-error-response.interface';

export class HandleErrorResponseService implements IHandleErrorResponseService {
  constructor() {}
  handleError(err: HttpErrorResponse): void {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400:
          errorMessage = err.error.message;
          break;
        case 401:
          errorMessage = 'You need to log in to do this action.';
          break;
        case 403:
          errorMessage =
            "You don't have permission to access the requested resource.";
          break;
        case 404:
          errorMessage = 'The requested resource does not exist.';
          break;
        case 412:
          errorMessage = 'Precondition Failed.';
          break;
        case 500:
          errorMessage = 'Internal Server Error.';
          break;
        case 503:
          errorMessage = 'The requested service is not available.';
          break;
        case 422:
          errorMessage = 'Validation Error!';
          break;
        default:
          errorMessage = 'Something went wrong!';
      }
    }
    if (errorMessage) {
      // co the dung thu vien toastr hoac tu custom
      // this.toastr.error(errorMessage);
      alert(errorMessage);
    }
  }
}
