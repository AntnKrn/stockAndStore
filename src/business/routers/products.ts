import { Router } from "express";

import { addProduct, deleteProduct, editProduct, getProducts } from "../controllers/products";

const router = Router();

router.get('/', getProducts);

router.post('/', addProduct);

router.patch('/:id', editProduct);

router.delete('/:id', deleteProduct);

export default router;