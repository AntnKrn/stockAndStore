"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providers_1 = require("../../business/controllers/providers");
const router = (0, express_1.Router)();
router.get('/', providers_1.getProviders);
router.post('/', providers_1.addProvider);
exports.default = router;
