import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { AuthClient, TokenModel } from './../clients/GoForClient';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { URL } from '@env';

export class AuthService {

  authClient!: AuthClient;
  refreshClient = new AuthClient(URL);

  constructor() { 
    this.newAxiosInstance();    
  }

  async Test(): Promise<string> {
    console.log("test");
    return this.authClient.test();
  }

  async newAxiosInstance() {
    const axiosInstance = axios.create();
    const token = await SecureStore.getItemAsync("token");
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    createAuthRefreshInterceptor(axiosInstance, this.refreshToken)
    this.authClient = new AuthClient(URL, axiosInstance);
  }

  async refreshToken(failedRequest: any): Promise<void> {
    const token = await SecureStore.getItemAsync("token");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const tokenModel = new TokenModel();
    tokenModel.token = token as string;
    tokenModel.refreshToken = refreshToken as string;
    this.refreshClient.refresh(tokenModel)
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