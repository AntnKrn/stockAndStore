import { Router } from "express";

import { addProduct, editProduct, getProducts } from "../controllers/products";

const router = Router();

router.post('/', addProduct);

router.get('/', getProducts)

router.patch('/:id', editProduct)
export default router;