"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareasControllers_1 = __importDefault(require("../controllers/tareasControllers"));
class TareasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tareasControllers_1.default.getTareas);
        //Lista un tarea
        this.router.get('/:PkTarea', tareasControllers_1.default.GetOne);
        //Lista  tareas sin asignar
        this.router.get('/sinasignar/:PkOrdenRep', tareasControllers_1.default.getTareasSinAsignar);
        //crear
        this.router.post('/nuevatarea', tareasControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkTarea', tareasControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkTarea', tareasControllers_1.default.update);
    }
}
const tareasRoutes = new TareasRoutes();
exports.default = tareasRoutes.router;
