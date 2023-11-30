import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>



//ЛОГИН И ЛОГАУТ РЕДЮСЕРЫ НАДО ОБЪЕДИНИТЬ ПОТОМУ ЧТО ПРИ ВЫХОДЕ ИЛИ ВХОДЕ ИЗМЕНЕТСЯ СОСТОЯНИЕ ТОЛЬКО У ЛОГИНА ИЛИ ЛОГАУТА