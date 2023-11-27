import { RequestHandler } from "express";

import { ApiError } from "../exceptions/api-error";
import { validateAccessToken } from "../services/token";

export const authmiddleware: RequestHandler = (req, ers, next) => {
    try {   
        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader) {
            return next (ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        console.log(accessToken);
        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData: any = validateAccessToken(accessToken);
        console.log(userData)
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }
        
        req.body = userData;
        next();
    } catch(err) {
        return next(ApiError.UnauthorizedError())
    }
}   