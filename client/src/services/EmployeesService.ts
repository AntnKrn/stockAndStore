import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "../http";

export default class EmployeesService{
    static async fetchUsers(): Promise<AxiosResponse> {
        return $api.get('/users')
    }
}