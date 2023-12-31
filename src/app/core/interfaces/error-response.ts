import { HttpErrorResponse } from "@angular/common/http";
import { CodeService } from ".";

export class ErrorResponse {
  stack?: string | undefined;
  code!: number;
  message!: string;
  stackTrace: any;
  constructor(err: HttpErrorResponse) {
    this._parseError(err);
  }


  private _parseError(err: HttpErrorResponse) {
    try {
      if (err.error instanceof Error) {
        this.message = err.error.message;
        this.code = CodeService.ValidateError;
        this.stackTrace = err.error.stack;
      } else {
        this.code = err.status;
        this.message = err.message;
        this.stackTrace = JSON.stringify(err.error);
      }
    } catch(e) {
      this.code = CodeService.SystemError;
      this.message = JSON.stringify(err);
    }
  }
}
