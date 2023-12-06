"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.editOrder = exports.postOrder = exports.getOrders = void 0;
const Order_1 = require("../models/Order");
const Order_2 = require("../../repositories/Order");
const getOrders = async (req, res, next) => {
    try {
        const data = await Order_2.OrdersData.getOrders();
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err);
    }
};
exports.getOrders = getOrders;
const postOrder = async (req, res, next) => {
    try {
        const { IDclient, IDproduct, quantity, price, date, IDemployee } = req.body;
        const newOrder = new Order_1.Order(IDclient, IDproduct, quantity, price, date, IDemployee);
        await Order_2.OrdersData.postOrder(newOrder);
        res.status(201).json({ message: "order added", order: newOrder });
    }
    catch (err) {
        console.log(err);
    }
};
exports.postOrder = postOrder;
const editOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { IDclient, IDproduct, quantity, price, date, IDemployee } = req.body;
        const updatedOrder = new Order_1.Order(IDclient, IDproduct, quantity, price, date, IDemployee, id);
        await Order_2.OrdersData.editOrder(updatedOrder);
        res.status(201).json({ message: "order edited", order: updatedOrder });
    }
    catch (err) {
        console.log(err);
    }
};
exports.editOrder = editOrder;
const deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Order_2.OrdersData.deleteOrder(id);
        res.status(201).json({ message: "order deleted" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteOrder = deleteOrder;
