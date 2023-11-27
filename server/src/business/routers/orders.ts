import { Router } from "express";
import { deleteOrder, editOrder, getOrders, postOrder } from "../controllers/orders";

const router = Router();

router.get('/', getOrders);

router.post('/', postOrder);

router.patch('/:id', editOrder);

router.delete('/:id', deleteOrder);

export default router;