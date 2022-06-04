"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudadesControllers_1 = __importDefault(require("../controllers/ciudadesControllers"));
class CiudadRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos las provincias
        this.router.get('/', ciudadesControllers_1.default.GetProvincias);
        //Lista una ciudad por provincia
        this.router.get('/:PkProvincia', ciudadesControllers_1.default.GetCiudadesFindByProv);
        //Lista una ciudad por codigo
        this.router.get('/ciudad/:PkCiudad', ciudadesControllers_1.default.GetCiudadesFindByCod);
    }
}
const ciudadRoutes = new CiudadRoutes();
exports.default = ciudadRoutes.router;
