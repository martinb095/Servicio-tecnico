"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repuestosControllers_1 = __importDefault(require("../controllers/repuestosControllers"));
class RepuestosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista repuestos
        this.router.get('/listar/:FkTipoRepuesto', repuestosControllers_1.default.getRepuestos);
        //Lista repuestos completo
        this.router.get('/listarcompleto/:FkTipoRepuesto', repuestosControllers_1.default.getRepuestosCompleto);
        //Lista un repuesto
        this.router.get('/:PkRepuesto', repuestosControllers_1.default.GetOne);
        //Lista  repuesto sin asignar
        this.router.get('/sinasignar/:PkOrdenRep', repuestosControllers_1.default.getRepuestosSinAsignar);
        //Lista repuestos filtrados por nombre
        this.router.get('/filtro/:Valor', repuestosControllers_1.default.getRepuestosFindByNombre);
        //crear
        this.router.post('/nuevorepuesto', repuestosControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkRepuesto', repuestosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkRepuesto', repuestosControllers_1.default.update);
    }
}
const repuestosRoutes = new RepuestosRoutes();
exports.default = repuestosRoutes.router;
