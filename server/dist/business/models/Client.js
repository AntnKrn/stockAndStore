"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    fullname;
    phoneNumber;
    address;
    id;
    constructor(fullname, phoneNumber, address, id) {
        this.fullname = fullname;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.id = id;
    }
    ;
}
exports.Client = Client;
