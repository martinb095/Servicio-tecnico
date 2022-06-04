"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = __importDefault(require("../controllers/usuariosControllers"));
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuariosControllers_1.default.getUsuarios);
        //Lista un tarea
        this.router.get('/:PkUsuario', usuariosControllers_1.default.getOne);
        //crear
        this.router.post('/nuevousuario', usuariosControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkUsuario', usuariosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkUsuario', usuariosControllers_1.default.update);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
