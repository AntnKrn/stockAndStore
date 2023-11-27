"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refresh_1 = require("../controllers/refresh");
const router = (0, express_1.Router)();
router.post('/', refresh_1.refreshToken);
exports.default = router;
