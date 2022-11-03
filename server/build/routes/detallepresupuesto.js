"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePresupuestoControllers_1 = __importDefault(require("../controllers/detallePresupuestoControllers"));
class DetallePresupuestoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los detallerepuestos
        //this.router.get('/', detallepedidoRoutes.getDetalleOrden);
        //Lista un detallerepuesto
        //this.router.get('/:PkDetallePedido', detallepedidoRoutes.GetOne);
        //Crear
        this.router.post('/', detallePresupuestoControllers_1.default.create);
        //Eliminar
        this.router.delete('/:PkDetallePresup', detallePresupuestoControllers_1.default.delete);
        //Lista detalles
        this.router.get('/presupuesto/:FkPresupuesto', detallePresupuestoControllers_1.default.getFindByPresupuesto);
        //Actualizar
        this.router.put('/:PkDetallePresup', detallePresupuestoControllers_1.default.update);
        //Lista detallerepuestos para mostrar
        //this.router.get('/detalle/:FkOrdenrep', detalleordenControllers.getFindByOrden);
    }
}
const detallePresupuestoRoutes = new DetallePresupuestoRoutes();
exports.default = detallePresupuestoRoutes.router;
