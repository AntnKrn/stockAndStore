import { RequestHandler } from "express";

import { UsersData } from "../../repositories/Users";
import { User } from "../models/User";

export const getUsers: RequestHandler = async(req, res, next) => {
    try {
        const data = await UsersData.getUsers();
        
        res.json(data);
    } catch(err) {
        next(err);
    }
}

export const postUser: RequestHandler = async(req, res, next) => {
    try {
        const {login, password}: User = req.body;
        const newUser = new User(login, password);
        await UsersData.postUser(newUser);

        res.status(201).json({ message: "user created", user: newUser });
    } catch(err) {
        next(err);
    }
}
