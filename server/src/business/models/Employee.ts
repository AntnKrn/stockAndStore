export class Employee {
    constructor(
        public fullname: string,
        public position: string,
        public passportNumber: string,
        public email: string,
        public id?: number
    ) {};
}