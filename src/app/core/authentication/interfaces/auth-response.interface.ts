import { IUserInformation } from './user-information.interface';
export interface IAuthResponse {
  roles: any[];
  accessToken: any;
  userInfo: IUserInformation;
}
