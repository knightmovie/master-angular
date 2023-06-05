import { IUserInformation } from './user-information.interface';
export interface IAuthState {
  user: IUserInformation;
  token: string;
  tokenExpiry: Date;
}
