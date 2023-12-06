import bcrypt from "bcrypt";

import { UsersData } from "../../repositories/Users";
import { findToken, generateTokens, removeToken, saveToken, validateRefreshToken } from "./token";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";

export const reg = async (login: string, password: string) => {
    const condidate: any = await UsersData.getUserByLogin(login);

    if(condidate.length !== 0) {
        throw ApiError.BadRequest(`Пользоватеь с почтовым адресом ${login} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);

    await UsersData.postUser({ login, hashPassword });
    const user: any = await UsersData.getUserByLogin(login);

    const userDto = new UserDto(user[0]);
    const tokens = generateTokens(userDto);
    await saveToken(userDto.id, tokens.refreshToken)
    
    return { ...tokens, user: userDto }
}

export const log = async(login: string, password: string) => {
    const user: any = await UsersData.getUserByLogin(login);

    if(user.length === 0) {
        throw ApiError.BadRequest(`Пользоватеь с почтовым адресом ${login} не найден`);
    } 

    const isPassEquals = await bcrypt.compare(password, user[0].password);
    if(!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user[0]);
    const tokens = generateTokens(userDto); 
    await saveToken(userDto.id, tokens.refreshToken)
    
    return { ...tokens, user: userDto }

}

export const logou = async(refreshToken: string) => {
    const token = await removeToken(refreshToken);

    return token;
} 

export const refresh = async (refreshToken: string) => {
    if(!refreshToken) {
        throw ApiError.UnauthorizedError();
    }

    const userData: any = validateRefreshToken(refreshToken);

    const dataFromDBbyRefreshToken: any = await findToken(refreshToken);
    const refreshTokenFromDB = dataFromDBbyRefreshToken[0].IDuser;
    console.log("fdskomfoidsofisd", userData);

    console.log("111111111", refreshTokenFromDB);
    if(userData.length === 0 || refreshTokenFromDB.length === 0) {
        throw ApiError.UnauthorizedError();
    }

    const user: any = await UsersData.getUserByUserID(userData.payload.id);
    const userDto = new UserDto(user[0]);
    const tokens = generateTokens(userDto); 

    await saveToken(userDto.id, tokens.refreshToken)
    
    return { ...tokens, user: userDto }
}