"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProvider = exports.editProvider = exports.addProvider = exports.getProviders = void 0;
const Provider_1 = require("../models/Provider");
const Providers_1 = __importDefault(require("../../data/Providers"));
const getProviders = async (req, res, next) => {
    try {
        const providers = await Providers_1.default.fetchProviders();
        const data = providers.map((provider) => ({
            id: provider.providerID,
            name: provider.name,
            phoneNumber: provider.phoneNumber,
            category: provider.category,
            address: provider.address,
            contactPerson: provider.contactPerson,
            email: provider.email
        }));
        res.status(200).json(data);
    }
    catch (err) {
        console.log('Error from controller getProviders');
    }
};
exports.getProviders = getProviders;
const addProvider = async (req, res, next) => {
    try {
        const { name, phoneNumber, category, address, contactPerson, email } = req.body;
        const newProvider = new Provider_1.Provider(name, phoneNumber, category, address, contactPerson, email);
        await Providers_1.default.postProvider(newProvider);
        res.status(201).json({ message: 'Created a provider', createdProvider: newProvider });
    }
    catch (err) {
        console.log(err, 'Error from controller addProvider');
    }
};
exports.addProvider = addProvider;
const editProvider = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, phoneNumber, category, address, contactPerson, email } = req.body;
        const updatedProvider = new Provider_1.Provider(name, phoneNumber, category, address, contactPerson, email, id);
        console.log(updatedProvider);
        await Providers_1.default.editProvider(updatedProvider);
        res.status(201).json({ message: 'Updated a provider', updatedProvider: updatedProvider });
    }
    catch (err) {
        console.log(err, "error from controller edit provider");
    }
};
exports.editProvider = editProvider;
const deleteProvider = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Providers_1.default.deleteProvider(id);
        res.status(201).json({ message: 'Provider deleted', deleteProvider: id });
    }
    catch (err) {
        console.log(err, "error from deleteRpovider constructor");
    }
};
exports.deleteProvider = deleteProvider;
