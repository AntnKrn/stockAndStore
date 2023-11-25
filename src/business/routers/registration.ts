import { Router } from "express";

import { registration } from "../controllers/registration";

const router = Router();

router.post('/', registration);

export default router;