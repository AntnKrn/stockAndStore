"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.getUsers = void 0;
const Users_1 = require("../../data/Users");
const User_1 = require("../models/User");
const getUsers = async (req, res, next) => {
    try {
        const data = await Users_1.UsersData.getUsers();
        res.json(data);
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
const postUser = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const newUser = new User_1.User(login, password);
        await Users_1.UsersData.postUser(newUser);
        res.status(201).json({ message: "user created", user: newUser });
    }
    catch (err) {
        next(err);
    }
};
exports.postUser = postUser;
