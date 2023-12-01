export enum AuthActionTypes {
    FETCH_USERDATA_SUCCESS = "FETCH_USERDATA_SUCCESS",
    FETCH_USERDATA_ERROR = "FETCH_USERDATA_ERROR",
    LOGOUT = "LOGOUT",
    REGISTRATION_SUCCESS = "REGESTRATION_SUCCESS",
    REGISTRATION_ERROR = "REGISTRATION_ERROR"
}

export enum ProductsActionTypes {
    FETCH_PRODUCTS = "FETCH_PRODUCTS",
    FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS",
    FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS",
    POST_PRODUCTS_REQUEST = "POST_PRODUCTS_REQUEST",
    POST_PRODUCTS_SUCCESS = "POST_PRODUCTS_SUCCESS",
    POST_PRODUCTS_ERROR = "POST_PRODUCTS_ERROR"
}

export const FETCH_PRODUCTS: string = "FETCH_PRODUCTS";
