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

export type ProductsAction = IFetchProducts | IFetchProductsSuccess | IFetchProductsError;

