import { Dispatch } from "redux";
import { ProductsActionTypes } from "./actionsTypes";
import { getProductsAction, postProductsAction } from "../../types/productsData";
import ProductsService from "../../services/ProductsService";

export const fetchProducts = () => {
    return async (dispatch: Dispatch<getProductsAction>) => {
        try {
            dispatch({ type: ProductsActionTypes.FETCH_PRODUCTS })
            const response = await ProductsService.fetchProducts();
            console.log(response.data);
            dispatch({ type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS, payload: response.data})
        } catch(err) {
            dispatch({type: ProductsActionTypes.FETCH_PRODUCTS_ERROR, payload: "Ошибка полученния данных"})
        }
    }
}

export const postProducts = (name: string, brand: string, code: string, quantity: string, IDprovider: number, pricePurchase: string, priceSale: string, volume: number, weight: number, dateReceipt: string, description: string) => {
    return async (dispatch: Dispatch<postProductsAction>) => {
        try {
            dispatch({ type: ProductsActionTypes.POST_PRODUCTS_REQUEST });
            await ProductsService.postProducts(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description);
            dispatch({ type: ProductsActionTypes.POST_PRODUCTS_SUCCESS })
        } catch(err) {
            dispatch({type: ProductsActionTypes.POST_PRODUCTS_ERROR, payload: 'Ошибка ввода данных. Повторите попытку'})
        }
    }
}