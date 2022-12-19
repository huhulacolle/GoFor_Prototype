import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { AuthClient, TokenModel, UserModel } from './../clients/GoForClient';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { URL } from '@env';

export class AuthService {

  async login(data: UserModel) {
    const authClient = await this.newAxiosInstance();
    return authClient.login(data);
  }

  async Test() {
    const authClient = await this.newAxiosInstance();
    return authClient.test();
  }

  async newAxiosInstance() {
    const axiosInstance = axios.create();
    const token = await SecureStore.getItemAsync("token");
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    createAuthRefreshInterceptor(axiosInstance, this.refreshToken)
    return new AuthClient(URL, axiosInstance);
  }

  async refreshToken(failedRequest: any): Promise<void> {
    const refreshClient = new AuthClient(URL);
    const token = await SecureStore.getItemAsync("token");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const tokenModel = new TokenModel();
    tokenModel.token = token as string;
    tokenModel.refreshToken = refreshToken as string;
    refreshClient.refresh(tokenModel)
    .then(
      async (newToken) => {
        await SecureStore.setItemAsync("token", newToken.token);
        await SecureStore.setItemAsync("refreshToken", newToken.refreshToken);
        failedRequest.response.config.headers['Authorization'] = `Bearer ${newToken.token}`
        return Promise.resolve();
      }
    )
  }
}