"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repuestosHistControllers_1 = __importDefault(require("../controllers/repuestosHistControllers"));
class RepuestosHistRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:PkRepuesto', repuestosHistControllers_1.default.getRepuestosFindByRepuesto);
    }
}
const repuestosHistRoutes = new RepuestosHistRoutes();
exports.default = repuestosHistRoutes.router;
