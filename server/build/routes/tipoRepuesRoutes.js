"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoRepControllers_1 = __importDefault(require("../controllers/tipoRepControllers"));
class TipoRepuestosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los tipo repuestos
        this.router.get('/', tipoRepControllers_1.default.list);
        //Lista un tipo repuestos
        this.router.get('/:PkTipoRepuesto', tipoRepControllers_1.default.GetOne);
        this.router.post('/registrartiporepuesto', tipoRepControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkTipoRepuesto', tipoRepControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkTipoRepuesto', tipoRepControllers_1.default.update);
    }
}
const tipoRepuestosRoutes = new TipoRepuestosRoutes();
exports.default = tipoRepuestosRoutes.router;
