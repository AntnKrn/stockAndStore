import { FetchUserDataActionTypes, LOGOUT } from "../store/actions/actionsTypes";

export interface UserState {
    userData: any;
    isAuth: boolean;
    error: null | string
}

export interface IUserAction {
    type: string;
    payload?: any;
}

interface IFetchUserDataAction {
    type: FetchUserDataActionTypes.FETCH_USERDATA;
}

interface IFetchUserDataSuccessAction {
    type: FetchUserDataActionTypes.FETCH_USERDATA_SUCCESS;
    payload: any[]
}

interface IFetchUserDataErrorAction {
    type: FetchUserDataActionTypes.FETCH_USERDATA_ERROR;
    payload: string
}

export interface ILogout {
    type: typeof LOGOUT
}

export type UserAction = IFetchUserDataAction | IFetchUserDataSuccessAction | IFetchUserDataErrorAction;

