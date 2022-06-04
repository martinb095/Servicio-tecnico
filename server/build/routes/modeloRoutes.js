"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modeloControllers_1 = __importDefault(require("../controllers//modeloControllers"));
class ModelosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista modelos segun marca
        this.router.get('/', modeloControllers_1.default.getModelos);
        //Lista un modelos
        this.router.get('/:PkModelo', modeloControllers_1.default.GetOne);
        //Lista un modelo por producto
        this.router.get('/producto/:FkProducto', modeloControllers_1.default.findByProducto);
        this.router.post('/', modeloControllers_1.default.create);
        //Eliminar
        this.router.delete('/:PkModelo', modeloControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkModelo', modeloControllers_1.default.update);
    }
}
const modelosRoutes = new ModelosRoutes();
exports.default = modelosRoutes.router;
