"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.getProducts = exports.addProduct = void 0;
const products_1 = require("../models/products");
const Products_1 = __importDefault(require("../../data/Products"));
const addProduct = async (req, res, next) => {
    try {
        const { name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description } = req.body;
        const newProduct = new products_1.Products(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description);
        await Products_1.default.addProduct(newProduct);
        res.status(201).json({ message: "Product added", addedProduct: newProduct });
    }
    catch (err) {
        console.log("error from addProduct controller", err);
    }
};
exports.addProduct = addProduct;
const getProducts = async (req, res, next) => {
    try {
        const products = await Products_1.default.getProducts();
        const data = products.map((products) => ({
            name: products.name,
            brand: products.brand,
            code: products.code,
            quantity: products.quantity,
            IDprovider: products.IDprovider,
            pricePurchase: products.pricePurchase,
            priceSale: products.priceSale,
            volume: products.volume,
            weight: products.weight,
            dateReceipt: products.dateReceipt,
            description: products.description
        }));
        res.status(201).json(data);
    }
    catch (err) {
        console.log("error from getProducts controller", err);
    }
};
exports.getProducts = getProducts;
const editProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description } = req.body;
        const updatedProduct = new products_1.Products(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description, id);
        await Products_1.default.editProduct(updatedProduct);
        res.status(201).json({ message: "Product added", addedProduct: updatedProduct });
    }
    catch (err) {
        console.log("error from editPorduct controller", err);
    }
};
exports.editProduct = editProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Products_1.default.deleteProduct(id);
        res.status(201).json({ message: "Deleted", id: id });
    }
    catch (err) {
        console.log("error from deleteProduct controller", err);
    }
};
exports.deleteProduct = deleteProduct;
