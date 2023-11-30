import { RequestHandler } from "express";
import { refresh } from "../services/user";

export const refreshToken: RequestHandler = async(req, res, next) => {
    try {
        const {refreshToken} = req.cookies;

        const userData = await refresh(refreshToken);

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.status(201).json(userData);
    } catch(err) {
        next(err);
    }
} 