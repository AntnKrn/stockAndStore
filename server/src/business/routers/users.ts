import { Router } from "express";

import { getUsers, postUser } from "../controllers/users";
import { authmiddleware } from "../middleware/auth";

const router = Router();

router.get("/", getUsers);

router.post("/", postUser);

export default router;
