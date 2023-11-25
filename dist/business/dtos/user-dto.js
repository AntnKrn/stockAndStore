"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    login;
    id;
    role;
    constructor(model) {
        this.id = model.userID;
        this.login = model.login;
        this.role = model.role;
    }
}
exports.UserDto = UserDto;
