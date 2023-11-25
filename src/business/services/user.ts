import bcrypt from "bcrypt";

import { UsersData } from "../../data/Users";
import { generateTokens, saveToken } from "./token";
import { UserDto } from "../dtos/user-dto";

export const reg = async (login: string, password: string) => {
    const condidate: any = await UsersData.getUserByLogin(login);

    if(condidate.length !== 0) {
        throw new Error("Пользоватеь с почтовым адресом " + login + " уже существует" )
    }
    const hashPassword = await bcrypt.hash(password, 3);

    await UsersData.postUser({ login, hashPassword });
    const user: any = await UsersData.getUserByLogin(login);

    const userDto = new UserDto(user[0]);
    const tokens = generateTokens(userDto);
    console.log(userDto.id);
    console.log(tokens.refreshToken)
    await saveToken(userDto.id, tokens.refreshToken)
    
    return { ...tokens, user: userDto }
}