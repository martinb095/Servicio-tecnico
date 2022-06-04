"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcasControllers_1 = __importDefault(require("../controllers/marcasControllers"));
class MarcasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos las marcas
        this.router.get('/', marcasControllers_1.default.list);
        //Lista un cliente
        this.router.get('/:PkMarca', marcasControllers_1.default.GetOne);
        //Lista marcas filtrados por nombre
        this.router.get('/filtro/:Valor', marcasControllers_1.default.getMarcasFindByNombre);
        this.router.post('/nuevamarca', marcasControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkMarca', marcasControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkMarca', marcasControllers_1.default.update);
        //Lista una marca por producto
        //this.router.get('/producto/:FkProducto', marcasControllers.MarcasFindByProducto);
    }
}
const marcasRoutes = new MarcasRoutes();
exports.default = marcasRoutes.router;
