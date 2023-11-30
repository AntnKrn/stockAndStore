import { RequestHandler } from "express";

import { UsersData } from "../../data/Users";
import { log } from "../services/user";

export const login: RequestHandler = async(req, res, next) => {
    try {
        const {login, password} = req.body;
        const userData = await log(login, password);

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.status(201).json(userData);
    } catch(err) {
        next(err);
    }
}