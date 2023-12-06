import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "../http";

export default class ProviderService{
    static async fetchProviders(): Promise<AxiosResponse> {
        return $api.get('/providers')
    }

    static async postProvider(name: string, phoneNumber: string, category: string, address: string, contactPerson: string, email: string): Promise<void> {
        return $api.post('/providers', {name, phoneNumber, category, address, contactPerson, email});
    }

    static async deleteProvider(id: number){
        return $api.delete(`/providers/${id}`)
    }

    static async patchProvider(name: string, phoneNumber: string, category: string, address: string, contactPerson: string, email: string, id: number): Promise<void> {
        return $api.patch(`/providers/${id}`, {name, phoneNumber, category, address, contactPerson, email});
    }
}