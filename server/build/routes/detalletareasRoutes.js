"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleTareasControllers_1 = __importDefault(require("../controllers/detalleTareasControllers"));
class DetalleTareasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los detalletareas
        this.router.get('/', detalleTareasControllers_1.default.getDetalleTareas);
        //Lista un detalletarea
        this.router.get('/:PkDetalleTarea', detalleTareasControllers_1.default.GetOne);
        //Crear
        this.router.post('/', detalleTareasControllers_1.default.create);
        //Eliminar
        this.router.delete('/:PkDetalleTarea', detalleTareasControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkDetalleTarea', detalleTareasControllers_1.default.update);
        //Lista detalles por orden
        this.router.get('/ordenrep/:FkOrdenRep', detalleTareasControllers_1.default.getFindByOrden);
        //Lista detallerepuestos para mostrar
        this.router.get('/detalle/:FkOrdenrep', detalleTareasControllers_1.default.GetDetallesFindByOrden);
    }
}
const detalletareasRoutes = new DetalleTareasRoutes();
exports.default = detalletareasRoutes.router;
