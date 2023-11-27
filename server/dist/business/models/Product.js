"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    name;
    brand;
    code;
    quantity;
    IDprovider;
    pricePurchase;
    priceSale;
    volume;
    weight;
    dateReceipt;
    description;
    id;
    constructor(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description, id) {
        this.name = name;
        this.brand = brand;
        this.code = code;
        this.quantity = quantity;
        this.IDprovider = IDprovider;
        this.pricePurchase = pricePurchase;
        this.priceSale = priceSale;
        this.volume = volume;
        this.weight = weight;
        this.dateReceipt = dateReceipt;
        this.description = description;
        this.id = id;
    }
    ;
}
exports.Product = Product;
