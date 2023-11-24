import { Router } from 'express';

import { addProvider, deleteProvider, editProvider, getProviders } from '../controllers/providers';

const router = Router();

router.get('/', getProviders);

router.post('/', addProvider);

router.patch('/:id', editProvider);

router.delete('/:id', deleteProvider);

export default router;