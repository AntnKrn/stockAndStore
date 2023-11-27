"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviders = void 0;
const business_1 = __importDefault(require("../../business/business"));
const getProviders = async (req, res, next) => {
    try {
        const providers = await business_1.default.getProviders();
        res.status(200).json(providers);
    }
    catch (err) {
        console.log('Error from controller providers');
    }
};
exports.getProviders = getProviders;
