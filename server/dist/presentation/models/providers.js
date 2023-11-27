"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
class Provider {
    name;
    phoneNumber;
    category;
    address;
    contactPerson;
    email;
    constructor(name, phoneNumber, category, address, contactPerson, email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.category = category;
        this.address = address;
        this.contactPerson = contactPerson;
        this.email = email;
    }
    ;
}
exports.Provider = Provider;
