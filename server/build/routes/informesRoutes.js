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
    }
}
const informesRoutes = new InformesRoutes();
exports.default = informesRoutes.router;
