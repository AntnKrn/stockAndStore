export class Order {
    constructor(
        public IDclient: number,
        public IDproduct: number,
        public quantity: number,
        public price: number,
        public date: Date,
        public IDemployee: number,
        public orderID?: number
    ){};
}