import { FetchUserDataActionTypes, LOGOUT } from "../actions/actionsTypes"; 
import { IUserAction, UserState } from "../../types/userData";
import { IAuthResponse } from "../../models/response/AuthResponse";

const initialState: UserState = {
    userData: {} as IAuthResponse, 
    isAuth: false,
    error: null
}

export const loginReducer = (state = initialState, action: IUserAction): UserState => {
    switch(action.type) {
        case FetchUserDataActionTypes.FETCH_USERDATA: {
            return {
                isAuth: false,
                userData: {},
                error: null
            }
        }

        case FetchUserDataActionTypes.FETCH_USERDATA_SUCCESS: {
            return {
                isAuth: true,
                userData: action.payload,
                error: null
            }
        }

        case FetchUserDataActionTypes.FETCH_USERDATA_ERROR: {
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
}

export const logoutReducer = (state = initialState, action: IUserAction): UserState => {
    switch(action.type) {
        case LOGOUT: {
            return {
                isAuth: false,
                userData: {},
                error: null
            }
        }
    
        default: { 
            return state
        }
    }
}