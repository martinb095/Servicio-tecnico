"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const presupuestosController_1 = __importDefault(require("../controllers/presupuestosController"));
class PresupuestosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:FechaDesde/:FechaHasta', presupuestosController_1.default.getPresupuestos);
        this.router.get('/:PkPresupuesto', presupuestosController_1.default.getOne);
        //Eliminar
        this.router.put('/eliminar/:PkPresupuesto', presupuestosController_1.default.delete);
        //Nuevo
        this.router.post('/nuevopedido', presupuestosController_1.default.create);
        //Actualizar
        this.router.put('/actualizar/:PkPresupuesto', presupuestosController_1.default.update);
        //Procesar
        //this.router.put('/procesar/:PkPedProv', presupuestosRoutes.procesar);
    }
}
const presupuestosRoutes = new PresupuestosRoutes();
exports.default = presupuestosRoutes.router;
