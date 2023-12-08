import { Router } from "express";
import OrderController from "../controllers/orders";

const router = Router();

router.get('/', OrderController.getOrders);

router.post('/', OrderController.postOrder);

router.patch('/:id', OrderController.editOrder);

router.delete('/:id', OrderController.deleteOrder);

export default router;