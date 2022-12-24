import { AuthClient, UserModel } from './../clients/GoForClient';
import { URL } from '@env';

export class AuthService {

  async login(data: UserModel) {
    const authClient = new AuthClient(URL);
    return authClient.login(data);
  }
}