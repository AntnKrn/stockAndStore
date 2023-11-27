"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const token_1 = require("../services/token");
const authmiddleware = (req, ers, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        console.log(accessToken);
        if (!accessToken) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const userData = (0, token_1.validateAccessToken)(accessToken);
        console.log(userData);
        if (!userData) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        req.body = userData;
        next();
    }
    catch (err) {
        return next(api_error_1.ApiError.UnauthorizedError());
    }
};
exports.authmiddleware = authmiddleware;
