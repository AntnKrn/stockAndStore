"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProvider = exports.getProviders = void 0;
const providers_1 = require("../models/providers");
const data_1 = __importDefault(require("../../data/data"));
const getProviders = async (req, res, next) => {
    try {
        const providers = await data_1.default.fetchProviders();
        return providers.map((provider) => ({
            id: provider.id,
            name: provider.name,
            phoneNumber: provider.phone_number,
            category: provider.category,
            address: provider.address,
            contactPerson: provider.contact_person,
            email: provider.email
        }));
        res.status(200).json(providers);
    }
    catch (err) {
        console.log('Error from controller getProviders');
    }
};
exports.getProviders = getProviders;
const addProvider = async (req, res, next) => {
    try {
        const { name, phoneNumber, category, address, contactPerson, email } = req.body;
        const newProvider = new providers_1.Provider(name, phoneNumber, category, address, contactPerson, email);
        await data_1.default.postProvider(newProvider);
        res.status(201).json({ message: 'Created a provider', createdProvider: newProvider });
    }
    catch (err) {
        console.log('Error from controller addProvider');
    }
};
exports.addProvider = addProvider;
