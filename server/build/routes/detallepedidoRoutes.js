"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePedidoControllers_1 = __importDefault(require("../controllers/detallePedidoControllers"));
class DetallepedidoRoutes {
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
        this.router.post('/', detallePedidoControllers_1.default.create);
        //Eliminar
        this.router.delete('/:PkDetallePedido', detallePedidoControllers_1.default.delete);
        //Lista detalles por orden
        this.router.get('/pedido/:FkPedProv', detallePedidoControllers_1.default.getFindByPedido);
        //Actualizar
        this.router.put('/:PkDetallePedido', detallePedidoControllers_1.default.update);
        //Lista detallerepuestos para mostrar
        //this.router.get('/detalle/:FkOrdenrep', detalleordenControllers.getFindByOrden);
    }
}
const detallepedidoRoutes = new DetallepedidoRoutes();
exports.default = detallepedidoRoutes.router;
