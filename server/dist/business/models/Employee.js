"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    fullname;
    position;
    passportNumber;
    email;
    id;
    constructor(fullname, position, passportNumber, email, id) {
        this.fullname = fullname;
        this.position = position;
        this.passportNumber = passportNumber;
        this.email = email;
        this.id = id;
    }
    ;
}
exports.Employee = Employee;
