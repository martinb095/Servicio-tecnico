"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadosControllers_1 = __importDefault(require("../controllers/estadosControllers"));
class EstadosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', estadosControllers_1.default.getEstados);
        this.router.get('/:PkEstado', estadosControllers_1.default.GetOne);
        this.router.post('/', estadosControllers_1.default.create);
        //Eliminar
        this.router.delete('/:PkEstado', estadosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkEstado', estadosControllers_1.default.update);
        this.router.get('/estadohis/:PkOrdenRep', estadosControllers_1.default.getHistorialEstados);
    }
}
const estadosRoutes = new EstadosRoutes();
exports.default = estadosRoutes.router;
