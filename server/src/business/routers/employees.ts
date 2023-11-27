import { Router } from "express";

import { deleteEmployee, editEmployee, getEmployees, postEmployee } from "../controllers/employees";

const router = Router();

router.get('/', getEmployees);

router.post('/', postEmployee);

router.patch('/:id', editEmployee);

router.delete('/:id', deleteEmployee);

export default router;