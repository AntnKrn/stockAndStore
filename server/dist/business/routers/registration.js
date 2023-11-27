"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registration_1 = require("../controllers/registration");
const router = (0, express_1.Router)();
router.post('/', registration_1.registration);
exports.default = router;
