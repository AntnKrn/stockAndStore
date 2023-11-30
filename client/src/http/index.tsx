import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "http:/localhost:3000"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${AsyncStorage.getItem('token')}`;
    return config
})

export default $api;