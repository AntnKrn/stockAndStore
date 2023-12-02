import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "../http";

export default class ProductsService{
    static async fetchProducts(): Promise<AxiosResponse> {
        return $api.get('/products')
    }

    static async postProducts(name: string, brand: string, code: string, quantity: string, IDprovider: string, pricePurchase: string, priceSale: string, volume: string, weight: string, dateReceipt: string, description: string): Promise<void> {
        return $api.post('/products', {name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description});
    }

    static async deleteProducts(id: number){
        return $api.delete(`/products/${id}`)
    }

    static async patchProducts(id: number, name: string, brand: string, code: string, quantity: string, IDprovider: string, pricePurchase: string, priceSale: string, volume: string, weight: string, dateReceipt: string, description: string): Promise<void> {
        return $api.patch(`/products/${id}`, {name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description});
    }
}