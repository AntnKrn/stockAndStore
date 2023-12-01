import { ProductsActionTypes } from "../store/actions/actionsTypes";

export interface ProductState {
    products: any;
    isLoaded: boolean;
    error: null | string
}

export interface IProductsAction {
    type: string;
    payload?: any;
}

interface IFetchProducts {
    type: ProductsActionTypes.FETCH_PRODUCTS;
    payload: any[]
}

interface IFetchProductsSuccess {
    type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: any[]
}

interface IFetchProductsError {
    type: ProductsActionTypes.FETCH_PRODUCTS_ERROR;
}

interface IPostProducts{
    type: ProductsActionTypes.POST_PRODUCTS_REQUEST;
}

interface IPostProductsSuccess {
    type: ProductsActionTypes.POST_PRODUCTS_SUCCESS;
    payload?: any[]
}

interface IPostProductsError {
    type: ProductsActionTypes.POST_PRODUCTS_ERROR;
}
export type postProductsAction = IPostProducts | IPostProductsSuccess | IPostProductsError;
export type getProductsAction = IFetchProducts | IFetchProductsSuccess | IFetchProductsError;

