"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = __importDefault(require("../controllers/orders"));
const router = (0, express_1.Router)();
router.get('/', orders_1.default.getOrders);
router.post('/', orders_1.default.postOrder);
router.patch('/:id', orders_1.default.editOrder);
router.delete('/:id', orders_1.default.deleteOrder);
exports.default = router;
