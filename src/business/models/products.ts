export class Products {
    constructor(
        public name: string,
        public brand: string,
        public code: string,
        public quantity: number,
        public IDprovider: number,
        public pricePurchase: number,
        public priceSale: number,
        public volume: number,
        public weight: number,
        public dateReceipt: Date,
        public description?: string,
        public id?: number
    ){};
}