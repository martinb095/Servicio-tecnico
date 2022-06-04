"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesControllers_1 = __importDefault(require("../controllers/clientesControllers"));
class ClientesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los clientes
        this.router.get('/', clientesControllers_1.default.getClientes);
        //Lista un cliente
        this.router.get('/:PkCliente', clientesControllers_1.default.GetOne);
        //Lista clientes filtrados por nombre
        this.router.get('/filtro/:Valor', clientesControllers_1.default.getClientesFindByNombre);
        //Crear
        this.router.post('/', clientesControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkCliente', clientesControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkCliente', clientesControllers_1.default.update);
    }
}
const clientesRoutes = new ClientesRoutes();
exports.default = clientesRoutes.router;
