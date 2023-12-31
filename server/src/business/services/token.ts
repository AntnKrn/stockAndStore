import jwt from "jsonwebtoken";

import { TokenData } from "../../repositories/Token";

export const generateTokens = (payload: any) => {
    const accessToken = jwt.sign({payload}, "access", { expiresIn: '30m'});
    const refreshToken = jwt.sign({payload}, "refresh", {expiresIn: '30d'});

    return {
        accessToken,
        refreshToken
    }
}

export const saveToken = async (IDuser: number, refreshToken: string) => {
    const tokenData: any = await TokenData.getTokenByIDUser(IDuser);

    if(tokenData.length !== 0) {
        return await TokenData.updateToken(IDuser, refreshToken);
    }

    const token = await TokenData.postToken({ IDuser, refreshToken });

    return token;
}

export const removeToken = async(refreshToken: string) => {
    const tokenData = await TokenData.deleteToken(refreshToken);
    return tokenData;
}

export const validateAccessToken = (token: string) => {
    try {
        const userData = jwt.verify(token, "access");
        console.log("dsadasadsaadsa", userData);
        return userData;
    } catch(err) {
        console.log("error from validateaccesstokem")
        return null;
    }
}

export const validateRefreshToken = (token: string) => {
    try {
        const userData = jwt.verify(token, "refresh");
        return userData;
    } catch(err) {
        console.log("error from validatrefreshtokem")
        return null;
    }
}

export const findToken = async(token: string) => {
    try {   
        return TokenData.findToken(token);
    } catch(err) {
        console.log(err);
    }
}