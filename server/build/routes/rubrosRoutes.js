"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rubrosControllers_1 = __importDefault(require("../controllers/rubrosControllers"));
class RubroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los tipo repuestos
        this.router.get('/', rubrosControllers_1.default.list);
        //Lista un tipo repuestos
        this.router.get('/:PkRubro', rubrosControllers_1.default.GetOne);
        this.router.post('/registrarrubro', rubrosControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkRubro', rubrosControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkRubro', rubrosControllers_1.default.update);
    }
}
const rubroRoutes = new RubroRoutes();
exports.default = rubroRoutes.router;
