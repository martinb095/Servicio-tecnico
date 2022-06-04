"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modelosControllers_1 = __importDefault(require("../controllers/modelosControllers"));
class ModelosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista modelos segun marca
        this.router.get('/', modelosControllers_1.default.getModelos);
        //Lista un modelos
        this.router.get('/:PkModelo', modelosControllers_1.default.GetOne);
        //Lista modelos filtrados por nombre
        this.router.get('/filtro/:Valor', modelosControllers_1.default.getModelosFindByNombre);
        //Lista un modelo por marca
        this.router.get('/marca/:FkMarca', modelosControllers_1.default.getModelosFindByMarca);
        this.router.post('/nuevomodelo', modelosControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkModelo', modelosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkModelo', modelosControllers_1.default.update);
    }
}
const modelosRoutes = new ModelosRoutes();
exports.default = modelosRoutes.router;
