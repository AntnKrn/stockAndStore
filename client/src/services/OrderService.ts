import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "../http";

export default class OrderService {
  static async fetchOrders(): Promise<AxiosResponse> {
    return $api.get("/products");
  }

  static async postOrder(
    IDclient: string,
    IDproduct: string,
    quantity: string,
    price: string,
    date: string,
    IDemployee: string
  ): Promise<void> {
    return $api.post("/orders", {
      IDclient,
      IDproduct,
      quantity,
      price,
      date,
      IDemployee,
    });
  }

  static async deleteOrder(id: number) {
    return $api.delete(`/orders/${id}`);
  }

  static async patchOrders(
    id: number,
    IDclient: number,
    IDproduct: string,
    quantity: string,
    price: string,
    data: string,
    IDemployee: string
  ): Promise<void> {
    return $api.patch(`/products/${id}`, {
      name,
      IDclient,
      quantity,
      IDproduct,
      price,
      data,
      IDemployee,
    });
  }
}
