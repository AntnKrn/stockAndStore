import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "../http";

export default class OrderService{
    static async fetchProducts(): Promise<AxiosResponse> {
        return $api.get('/products')
    }

    static async postProducts(name: string, brand: string, code: string, quantity: string, IDprovider: string, pricePurchase: string, priceSale: string, volume: string, weight: string, dateReceipt: string, description: string): Promise<void> {
        return $api.post('/products', {name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description});
    }

    static async deleteOrder(id: number){
        return $api.delete(`/orders/${id}`)
    }

    static async patchOrders(id: number, IDclient: number, IDproduct: string, quantity: string, price: string, data: string, IDemployee: string): Promise<void> {
        return $api.patch(`/products/${id}`, {name, IDclient, quantity, IDproduct, price, data, IDemployee});
    }
}