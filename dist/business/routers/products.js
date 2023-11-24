"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
router.post('/', products_1.addProduct);
router.get('/', products_1.getProducts);
router.patch('/:id', products_1.editProduct);
exports.default = router;
