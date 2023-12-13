import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "../http";

export default class ClientsService {
  static async fetchClients(): Promise<AxiosResponse> {
    return $api.get("/clients");
  }

  static async postClient(
    fullname: string,
    phoneNumber: string,
    address: string
  ): Promise<void> {
    return $api.post("/clients", { fullname, phoneNumber, address });
  }

  static async deleteClient(id: number) {
    return $api.delete(`/clients/${id}`);
  }

  static async patchClients(
    id: number,
    fullname: string,
    phoneNumber: string,
    address: string
  ): Promise<void> {
    return $api.patch(`/clients/${id}`, { fullname, phoneNumber, address });
  }
}
