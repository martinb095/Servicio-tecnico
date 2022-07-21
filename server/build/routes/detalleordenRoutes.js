"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleOrdenControllers_1 = __importDefault(require("../controllers/detalleOrdenControllers"));
class DetalleordenRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los detallerepuestos
        this.router.get('/', detalleOrdenControllers_1.default.getDetalleOrden);
        //Lista un detallerepuesto
        this.router.get('/:PkDetalle', detalleOrdenControllers_1.default.GetOne);
        //Crear
        this.router.post('/', detalleOrdenControllers_1.default.create);
        //Eliminar               
        this.router.put('/eliminar/:PkDetalleOrden', detalleOrdenControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkDetalle', detalleOrdenControllers_1.default.update);
        //Lista detalles por orden
        this.router.get('/ordenrep/:FkOrdenRep', detalleOrdenControllers_1.default.getFindByOrden);
        //Lista detallerepuestos para mostrar
        //this.router.get('/detalle/:FkOrdenrep', detalleordenControllers.getFindByOrden);
    }
}
const detalleordenRoutes = new DetalleordenRoutes();
exports.default = detalleordenRoutes.router;
