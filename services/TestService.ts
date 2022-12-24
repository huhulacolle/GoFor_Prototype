import { TestClient } from './../clients/GoForClient';
import { URL } from '@env';
import axiosApiInstance from '../configuration/axiosInstance';

export default class TestService {

  private testClient = new TestClient(URL, axiosApiInstance)

  test(): Promise<string> {
    return this.testClient.test();
  }

} 