"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedoresControllers_1 = __importDefault(require("../controllers/proveedoresControllers"));
class ProveedoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Lista todos los proveedores
        this.router.get('/', proveedoresControllers_1.default.getProveedores);
        //Lista un cliente
        this.router.get('/:PkProveedor', proveedoresControllers_1.default.GetOne);
        //Lista proveedores filtrados por nombre
        this.router.get('/filtro/:Valor', proveedoresControllers_1.default.getProveedoresFindByNombre);
        //Crear
        this.router.post('/', proveedoresControllers_1.default.create);
        //Eliminar
        this.router.put('/eliminar/:PkProveedor', proveedoresControllers_1.default.delete);
        //Actualizar
        this.router.put('/:PkProveedor', proveedoresControllers_1.default.update);
        this.router.get('/descargarexcel/:PkProveedor', (req, res) => {
            console.log(req.params.PkProveedor);
            const rutaArchivo = 'C:\\Users\\Martin B\\Desktop\\ServicioTecnico-GIT\\ServicioTecnico\\src\\app\\ExcelProvedores\\ListaProv-' + req.params.PkProveedor + '.xls'; // Ruta física del archivo Excel          
            res.download(rutaArchivo, 'ListaProv-' + req.params.PkProveedor + '.xls', (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }
}
const proveedoresRoutes = new ProveedoresRoutes();
exports.default = proveedoresRoutes.router;
