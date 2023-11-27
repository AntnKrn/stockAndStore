export class Provider {
    constructor(
        public name: string, 
        public phoneNumber: string, 
        public category: string,
        public address: string,
        public contactPerson?: string,
        public email?: string,
        public id?: number,
    ){};
}