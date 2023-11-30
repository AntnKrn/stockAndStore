import { Dispatch } from "redux";
import { AuthActionTypes } from "./actionsTypes";
import { UserAction } from "../../types/userData";
import AuthService from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserData = (login: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await AuthService.login(login, password);

            await AsyncStorage.setItem('token', response.data.accessToken);
            dispatch({ type: AuthActionTypes.FETCH_USERDATA_SUCCESS, payload: response.data})
        } catch(err) {
            dispatch({type: AuthActionTypes.FETCH_USERDATA_ERROR, payload: 'Авторизация не прошла'})
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await AuthService.logout();

            await AsyncStorage.removeItem('token');

            dispatch({ type: AuthActionTypes.LOGOUT });
        } catch(err) {
            console.log(err);
        }
    }
}

export const registration = (login: string, password: string) => {
    return async(dispatch: Dispatch<UserAction>) => {
        try {
            await AuthService.registration(login, password);
            dispatch({ type: AuthActionTypes.REGISTRATION_SUCCESS });
        } catch(err) {
            dispatch({ type: AuthActionTypes.REGISTRATION_ERROR, payload: "Произошла ошиба регистрации" })
        }
    }
}