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
    providerID;
    constructor(name, phoneNumber, category, address, contactPerson, email, providerID) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.category = category;
        this.address = address;
        this.contactPerson = contactPerson;
        this.email = email;
        this.providerID = providerID;
    }
    ;
}
exports.Provider = Provider;
