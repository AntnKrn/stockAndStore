"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    IDclient;
    IDproduct;
    quantity;
    price;
    date;
    IDemployee;
    orderID;
    constructor(IDclient, IDproduct, quantity, price, date, IDemployee, orderID) {
        this.IDclient = IDclient;
        this.IDproduct = IDproduct;
        this.quantity = quantity;
        this.price = price;
        this.date = date;
        this.IDemployee = IDemployee;
        this.orderID = orderID;
    }
    ;
}
exports.Order = Order;
