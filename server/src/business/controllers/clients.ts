import { RequestHandler } from "express";

import { Client } from "../models/Client";
import { ClientsData } from "../../data/Clients";

export const addClient: RequestHandler = async (req, res, next) => {
    try {
        const {fullname, phoneNumber, address}: Client = req.body;
        const newClient = new Client(fullname, phoneNumber, address);

        await ClientsData.addClient(newClient);
        res.status(201).json( {message: 'Client added', client: newClient })
    }catch(err) {
        console.log(err);
    }
}

export const getClients: RequestHandler = async (req, res, next) => {
    try {
        const data = await ClientsData.getClients();

        res.status(201).json(data);
    } catch (err) {
        console.log(err);
    }
}

export const editClient: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {fullname, phoneNumber, address }: Client = req.body;
        const newClient = new Client(fullname, phoneNumber, address, id);
        await ClientsData.editClient(newClient);

        res.status(201).json({ message: "Client edited", client: newClient })
    } catch (err) {
        console.log(err);
    }
}

export const deleteClient: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        await ClientsData.deleteClient(id);
        res.status(201).json({ message: "Client deleted"})
    } catch (err) {
        console.log(err);
    }
}

