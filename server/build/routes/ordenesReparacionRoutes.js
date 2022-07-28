"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordenesRepControllers_1 = __importDefault(require("../controllers/ordenesRepControllers"));
class OrdenesReparacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los ordenes     
        this.router.get('/', ordenesRepControllers_1.default.getOrdenes);
        //obtener ultimo id     
        this.router.get('/idultimaorden', ordenesRepControllers_1.default.getLastIdOrden);
        //Lista una orden
        this.router.get('/:PkOrdenRep', ordenesRepControllers_1.default.GetOne);
        //Lista un orden para correo
        this.router.get('/mail/:PkOrdenRep', ordenesRepControllers_1.default.GetOneForEmail);
        //Lista un orden y el estado
        this.router.get('/detalleestado/:PkOrdenRep', ordenesRepControllers_1.default.getDetalleEstadoOrden);
        //Lista un ordenes para el filtro del menuordenes
        this.router.get('/filtromenu/:FkEstado/:FkCliente', ordenesRepControllers_1.default.getOrdenesFindByCliEstado);
        //Lista un ordenes por estado
        this.router.get('/estado/:FkEstado', ordenesRepControllers_1.default.getOrdenesFindByEstado);
        //Lista ordenes filtradas por nro para el menu
        this.router.get('/nro/:PkOrdenRep', ordenesRepControllers_1.default.getOrdenesFindByNro);
        //Nueva
        this.router.post('/nuevaorden', ordenesRepControllers_1.default.create);
        //Eliminar               
        this.router.put('/eliminar/:PkOrden', ordenesRepControllers_1.default.delete);
        //Actualizar
        this.router.put('/actualizar/:PkOrdenRep', ordenesRepControllers_1.default.update);
        //Actualizar estado
        this.router.put('/actualizarestado/:PkOrdenRep', ordenesRepControllers_1.default.updateEstado);
        //validar orden
        this.router.post('/validar', ordenesRepControllers_1.default.ValidarOrden);
    }
}
const ordenesreparacionRoutes = new OrdenesReparacionRoutes();
exports.default = ordenesreparacionRoutes.router;
