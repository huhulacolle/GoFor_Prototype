import axiosApiInstance from '../configuration/axiosInstance';
import { UserClient, TableModel, TutoModel } from './../clients/GoForClient';
import { URL } from '@env';

export default class UserService {

  private userClient = new UserClient(URL, axiosApiInstance)

  getTables(): Promise<TableModel[]> {
    return this.userClient.getTables();
  }

  setTable(data: TableModel): Promise<void> {
    return this.userClient.setTable(data);
  }

  getTuto(idTable: number): Promise<TutoModel[]> {
    return this.userClient.getTuto(idTable);
  }

  setTuto(data: TutoModel): Promise<void> {
    return this.userClient.setTuto(data);
  }
}