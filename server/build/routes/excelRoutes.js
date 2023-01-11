"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const excelControllers_1 = __importDefault(require("../controllers/excelControllers"));
class ExcelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/proveedores/', excelControllers_1.default.getProveedores);
        this.router.get('/clientes/', excelControllers_1.default.getClientes);
        this.router.get('/usuarios/', excelControllers_1.default.getUsuarios);
    }
}
const excelRoutes = new ExcelRoutes();
exports.default = excelRoutes.router;
