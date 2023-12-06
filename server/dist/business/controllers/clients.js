"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.editClient = exports.getClients = exports.addClient = void 0;
const Client_1 = require("../models/Client");
const Clients_1 = require("../../repositories/Clients");
const addClient = async (req, res, next) => {
    try {
        const { fullname, phoneNumber, address } = req.body;
        const newClient = new Client_1.Client(fullname, phoneNumber, address);
        await Clients_1.ClientsData.addClient(newClient);
        res.status(201).json({ message: 'Client added', client: newClient });
    }
    catch (err) {
        console.log(err);
    }
};
exports.addClient = addClient;
const getClients = async (req, res, next) => {
    try {
        const data = await Clients_1.ClientsData.getClients();
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err);
    }
};
exports.getClients = getClients;
const editClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { fullname, phoneNumber, address } = req.body;
        const newClient = new Client_1.Client(fullname, phoneNumber, address, id);
        await Clients_1.ClientsData.editClient(newClient);
        res.status(201).json({ message: "Client edited", client: newClient });
    }
    catch (err) {
        console.log(err);
    }
};
exports.editClient = editClient;
const deleteClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Clients_1.ClientsData.deleteClient(id);
        res.status(201).json({ message: "Client deleted" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteClient = deleteClient;
