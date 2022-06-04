"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleRepuestosControllers_1 = __importDefault(require("../controllers/detalleRepuestosControllers"));
class DetallerepuestosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los detallerepuestos
        this.router.get('/', detalleRepuestosControllers_1.default.getDetalleRepuestos);
        //Lista un detallerepuesto
        this.router.get('/:PkDetallerepuesto', detalleRepuestosControllers_1.default.GetOne);
        //Crear
        this.router.post('/', detalleRepuestosControllers_1.default.create);
        //Eliminar
        this.router.delete('/:PkDetallerepuesto', detalleRepuestosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkDetallerepuesto', detalleRepuestosControllers_1.default.update);
        //Lista detalles por orden
        this.router.get('/ordenrep/:FkOrdenRep', detalleRepuestosControllers_1.default.getFindByOrden);
        //Lista detallerepuestos para mostrar
        this.router.get('/detalle/:FkOrdenrep', detalleRepuestosControllers_1.default.getFindByOrden);
    }
}
const detallerepuestosRoutes = new DetallerepuestosRoutes();
exports.default = detallerepuestosRoutes.router;
