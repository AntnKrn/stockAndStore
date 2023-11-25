"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    login;
    password;
    userID;
    constructor(login, password, userID) {
        this.login = login;
        this.password = password;
        this.userID = userID;
    }
    ;
}
exports.User = User;
