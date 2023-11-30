import { AxiosResponse } from "axios";
import $api from "../http";

/* export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse> {
        return $api.post<IAuthResponse>('/login', {login, password});
    }

    static async registration(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/registration', {login, password});
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
} */

export default class ProductsService{
    static async fetchProducts(): Promise<AxiosResponse> {
        return $api.get('/products')
    }
}