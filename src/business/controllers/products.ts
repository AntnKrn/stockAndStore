import { RequestHandler } from "express";

import { Product } from "../models/Product";
import ProductsData from "../../data/Products";

export const addProduct: RequestHandler = async(req, res, next) => {
    try {
        const { name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description }: Product = req.body;
        const newProduct = new Product(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description);

        await ProductsData.addProduct(newProduct);
        res.status(201).json({ message: "Product added", addedProduct: newProduct })
    } catch(err) {
        console.log("error from addProduct controller", err);
    }
}

export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products: any = await ProductsData.getProducts();

        const data = products.map((products: Product) => ({
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
    } catch(err) {
        console.log("error from getProducts controller", err)
    }


}

export const editProduct: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description }: Product = req.body;
        const updatedProduct = new Product(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description, id);

        await ProductsData.editProduct(updatedProduct);
        res.status(201).json({ message: "Product added", addedProduct: updatedProduct }) 
    }catch(err) {
        console.log("error from editPorduct controller", err);
    }
}

export const deleteProduct: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        await ProductsData.deleteProduct(id);
        res.status(201).json({ message: "Deleted", id: id})
    } catch(err) {
        console.log("error from deleteProduct controller", err);
    }
}