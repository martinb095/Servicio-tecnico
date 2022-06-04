"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosControllers_1 = __importDefault(require("../controllers/productosControllers"));
class ProductosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista productos segun marca
        this.router.get('/', productosControllers_1.default.getProductos);
        //Lista un producto
        this.router.get('/:PkProducto', productosControllers_1.default.getOne);
        //Lista productos filtrados por nombre
        this.router.get('/filtro/:Valor', productosControllers_1.default.getProductosFindByNombre);
        this.router.post('/nuevoproducto', productosControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkProducto', productosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkProducto', productosControllers_1.default.update);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
