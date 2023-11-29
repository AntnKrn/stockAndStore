import { AxiosResponse } from "axios";
import $api from "../http";

export default class ProductsService{
    static fetchProducts(): Promise<AxiosResponse> {
        return $api.get('/products')
    }
}