import { RequestHandler } from "express";

import { Order } from "../models/Order";
import { OrdersData } from "../../repositories/Order";

export const getOrders: RequestHandler = async(req, res, next) => {
    try {
        const data = await OrdersData.getOrders();

        res.status(201).json(data);
    } catch(err) {
        console.log(err);
    }
}

export const postOrder: RequestHandler = async(req, res, next) => {
    try {
        const {IDclient, IDproduct, quantity, price, date, IDemployee}: Order = req.body;
        const newOrder = new Order(IDclient, IDproduct, quantity, price, date, IDemployee);

        await OrdersData.postOrder(newOrder);
        res.status(201).json({ message: "order added", order: newOrder});
    } catch(err) {
        console.log(err);
    }
}

export const editOrder: RequestHandler<{id: number}> = async(req, res, next) => {
    try {
        const id = req.params.id;
        const {IDclient, IDproduct, quantity, price, date, IDemployee}: Order = req.body;
        const updatedOrder = new Order(IDclient, IDproduct, quantity, price, date, IDemployee, id);

        await OrdersData.editOrder(updatedOrder);
        res.status(201).json({ message: "order edited", order: updatedOrder});
    } catch(err) {
        console.log(err);
    }
}

export const deleteOrder: RequestHandler<{id: number}> = async(req, res, next) => {
    try {
        const id = req.params.id;

        await OrdersData.deleteOrder(id);
        res.status(201).json({ message: "order deleted" });
    } catch(err) {
        console.log(err);
    }
}