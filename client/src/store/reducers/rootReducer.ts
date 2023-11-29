import { combineReducers } from "redux";
import { loginReducer, logoutReducer } from "./authReducer";

export const rootReducer = combineReducers({
    login: loginReducer,
    logout: logoutReducer
})

export type RootState = ReturnType<typeof rootReducer>