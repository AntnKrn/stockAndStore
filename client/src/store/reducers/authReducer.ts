import { AuthActionTypes } from "../actions/actionsTypes"; 
import { IUserAction, UserState } from "../../types/userData";
import { IAuthResponse } from "../../models/response/AuthResponse";

const initialState: UserState = {
    userData: {} as IAuthResponse, 
    isAuth: false,
    error: null
}

export const authReducer = (state = initialState, action: IUserAction): UserState => {
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
}