import { AuthActionTypes, ProductsActionTypes } from "../actions/actionsTypes"; 
import { IProductsAction, ProductState } from "../../types/productsData";
import { IProductsResponse } from "../../models/response/ProductsResponse";

const initialState: ProductState = {
    products: {} as IProductsResponse, 
    isLoaded: false,
    error: null
}

export const getProductsReducer = (state = initialState, action: IProductsAction): ProductState => {
    switch(action.type) {
        case ProductsActionTypes.FETCH_PRODUCTS: {
            return {
                products: [],
                isLoaded: false,
                error: null
            }
        }

        case ProductsActionTypes.FETCH_PRODUCTS_SUCCESS: {
            return {
                products: action.payload,
                isLoaded: true,
                error: null
            }
        }

        case ProductsActionTypes.FETCH_PRODUCTS_ERROR: {
            return {
                products: [],
                isLoaded: false,
                error: 'Произошла ошибка загрузки продуктров'
            }
        }
        default: {
            return state
        }
    }
}

export const postProductsReducer = (state = initialState, action: IProductsAction): ProductState => {
    switch(action.type) {
        case ProductsActionTypes.POST_PRODUCTS_REQUEST: {
            return {
                products: [],
                isLoaded: false,
                error: null
            }
        }

        case ProductsActionTypes.POST_PRODUCTS_SUCCESS: {
            return {
                products: action.payload,
                isLoaded: true,
                error: null
            }
        }

        case ProductsActionTypes.POST_PRODUCTS_ERROR: {
            return {
                products: [],
                isLoaded: false,
                error: 'Ошибка ввода данных. Повторите попытку'
            }
        }
        
        default: {
            return state
        }
    }
}