import { Dispatch } from "redux";
import { FetchUserDataActionTypes, LOGOUT } from "./actionsTypes";
import { UserAction, ILogout } from "../../types/userData";
import AuthService from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserData = (login: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: FetchUserDataActionTypes.FETCH_USERDATA});
            const response = await AuthService.login(login, password);

            await AsyncStorage.setItem('token', response.data.accessToken);
            dispatch({ type: FetchUserDataActionTypes.FETCH_USERDATA_SUCCESS, payload: response.data})
            
        } catch(err) {
            dispatch({type: FetchUserDataActionTypes.FETCH_USERDATA_ERROR, payload: 'Авторизация не прошла'})
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<ILogout>) => {
        try {
            await AuthService.logout();
            await AsyncStorage.removeItem('token');
            dispatch({type: LOGOUT});
        } catch(err) {
            console.log(err);
        }
    }
}