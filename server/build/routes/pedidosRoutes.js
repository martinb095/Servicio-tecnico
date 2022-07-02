"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidosControllers_1 = __importDefault(require("../controllers/pedidosControllers"));
class PedidosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los clientes
        this.router.get('/', pedidosControllers_1.default.getPedidos);
        this.router.get('/:PkPedProv', pedidosControllers_1.default.getOne);
        //Eliminar
        this.router.put('/eliminar/:PkPedProv', pedidosControllers_1.default.delete);
        //Nuevo
        this.router.post('/nuevopedido', pedidosControllers_1.default.create);
        //Actualizar
        this.router.put('/actualizar/:PkPedProv', pedidosControllers_1.default.update);
        //Procesar
        this.router.put('/procesar/:PkPedProv', pedidosControllers_1.default.procesar);
    }
}
const pedidosRoutes = new PedidosRoutes();
exports.default = pedidosRoutes.router;
