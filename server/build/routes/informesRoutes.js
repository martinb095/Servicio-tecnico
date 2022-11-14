"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const informesControllers_1 = __importDefault(require("../controllers/informesControllers"));
class InformesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/clientestop/', informesControllers_1.default.clientesMasVentas);
        this.router.post('/ordenesfechas', informesControllers_1.default.repEntreFechas);
        this.router.post('/stockrepuestos', informesControllers_1.default.stockRepuestos);
        this.router.post('/ordenesrepestados', informesControllers_1.default.ordenRepEstados);
        this.router.post('/repmasutilizados', informesControllers_1.default.repMasUtilizados);
        this.router.get('/detalleorden/:FkOrdenRep', informesControllers_1.default.getDetalleOrden);
        this.router.get('/detalleestado/:PkOrdenRep', informesControllers_1.default.getDetalleEstadoOrden);
        this.router.get('/detallepresupuesto/:FkPresupuesto', informesControllers_1.default.getDetallePresupuesto);
        this.router.post('/repormasutilizados', informesControllers_1.default.getPresORMasUti);
    }
}
const informesRoutes = new InformesRoutes();
exports.default = informesRoutes.router;
