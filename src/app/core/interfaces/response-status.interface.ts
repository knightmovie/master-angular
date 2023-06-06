export enum CodeService {
  SystemError = 300,
  ValidateError = 400,
  SUCCESS = 200,
}

export interface ResponseStatus {
  code: CodeService,
  message: string;
}
