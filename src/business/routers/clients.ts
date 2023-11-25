import { Router } from "express";

import { addClient, deleteClient, editClient, getClients } from "../controllers/clients";

const router = Router();

router.get('/', getClients);

router.post('/', addClient);

router.patch('/:id', editClient);

router.delete('/:id', deleteClient);

export default router;