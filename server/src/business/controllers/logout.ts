import { RequestHandler } from "express";

import { UsersData } from "../../data/Users";
import { logou } from "../services/user";

export const logout: RequestHandler = async(req, res, next) => {
    try {
        const {refreshToken} = req.cookies;

        const token = await logou(refreshToken);
        res.clearCookie('refreshToken');

        return res.json(token);
    } catch(err) {
        next(err);
    }
}