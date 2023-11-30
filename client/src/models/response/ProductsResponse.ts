export interface IProductsResponse {
    productID: number, 
    name: string,
    brand: string,
    code: string,
    quantity: number,
    IDprovider: number,
    pricePurchase: number,
    priceSale: number,
    volume: number,
    weight: number,
    dateReceipt: Date,
    description?: string,
}