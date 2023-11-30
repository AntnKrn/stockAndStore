import { AuthActionTypes, ProductsActionTypes } from "../actions/actionsTypes"; 
import { IProductsAction, ProductState } from "../../types/productsData";
import { IProductsResponse } from "../../models/response/ProductsResponse";

const initialState: ProductState = {
    products: {} as IProductsResponse, 
    isLoaded: false,
    error: null
}

export const productsReducer = (state = initialState, action: IProductsAction): ProductState => {
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

/* export const authReducer = (state = initialState, action: IUserAction): UserState => {
    switch(action.type) {
        case AuthActionTypes.FETCH_USERDATA_SUCCESS: {
            return {
                isAuth: true,
                userData: action.payload,
                error: null
            }
        }

        case AuthActionTypes.FETCH_USERDATA_ERROR: {
            return {
                isAuth: false,
                userData: {},
                error: action.payload
            }
        }

        case AuthActionTypes.LOGOUT: {
            return {
                isAuth: false,
                userData: {},
                error: null
            }
        }

        case AuthActionTypes.REGISTRATION_SUCCESS: {
            return {
                isAuth: false,
                userData: {},
                error: null
            }
        }

        case AuthActionTypes.REGISTRATION_ERROR: {
            return {
                isAuth: false,
                userData: {},
                error: action.payload
            }
        }

        default: { 
            return state
        }
    }
} */