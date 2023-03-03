import { TokenModel, AuthClient } from './../clients/GoForClient';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { URL } from '@env';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync("token") as string;
    config.headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } as any
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const tokenModel = new TokenModel;
    tokenModel.token = await SecureStore.getItemAsync("token") as string;
    tokenModel.refreshToken = await SecureStore.getItemAsync("refreshToken") as string;
    const authClient = new AuthClient(URL);
    const access_token = await authClient.refresh(tokenModel);
    await SecureStore.setItemAsync("token", access_token.token)
    await SecureStore.setItemAsync("refreshToken", access_token.refreshToken)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token.token;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;