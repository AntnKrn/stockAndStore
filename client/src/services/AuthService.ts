import { AxiosResponse } from "axios";
import $api from "../http";
import { IAuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(login: string, password: string): Promise<any> {
        return $api.post<IAuthResponse>('/login', {login, password});
    }

    static async registration(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/registration', {login, password});
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}