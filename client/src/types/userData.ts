import { AuthActionTypes } from "../store/actions/actionsTypes";

export interface UserState {
    userData: any;
    isAuth: boolean;
    error: null | string
}

export interface IUserAction {
    type: string;
    payload?: any;
}

interface IFetchUserDataSuccessAction {
    type: AuthActionTypes.FETCH_USERDATA_SUCCESS;
    payload: any[]
}

interface IFetchUserDataErrorAction {
    type: AuthActionTypes.FETCH_USERDATA_ERROR;
    payload: string
}

interface ILogout {
    type: AuthActionTypes.LOGOUT;
    payload?: any
}

interface IRegistrationSuccessAction {
    type: AuthActionTypes.REGISTRATION_SUCCESS;
    payload?: any
}

interface IRegistrationErrorAction {
    type: AuthActionTypes.REGISTRATION_ERROR;
    payload: string
}

export type UserAction = IFetchUserDataSuccessAction | IFetchUserDataErrorAction | ILogout | IRegistrationSuccessAction | IRegistrationErrorAction;

