"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ExcelController {
    getProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select p.PkProveedor "ID", p.Nombre, p.Firma, p.Cuit, p.Calle, p.Numero, p.Depto, p.Piso, c.Nombre "Ciudad", prov.Nombre as "Provincia", p.Telefono, p.Mail, p.Contacto1, p.Contacto2 from proveedor p left join ciudad c on c.PkCiudad=p.FkCiudad  left join provincia prov on prov.PkProvincia = c.FkProvincia where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "proveedores no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "proveedores no encontrado" });
                }
            });
        });
    }
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select c.PkCliente "ID", c.Nombre, c.Telefono, c.FkCiudad, c.Calle, c.Numero, c.Depto, c.Piso, c.Mail, c.Contrasenia, ciu.Nombre "Ciudad", prov.Nombre as "Provincia", c.Apellido from cliente c left join ciudad ciu on ciu.PkCiudad=c.FkCiudad  left join provincia prov on prov.PkProvincia = ciu.FkProvincia where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "clientes no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "clientes no encontrado" });
                }
            });
        });
    }
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT us.PkUsuario "ID", us.Nombre, us.Contrasenia, tu.TipoUsuario "Tipo", us.UltimoIngreso, us.Mail FROM usuario us left join tipousuario tu on tu.PkTipoUsuario =  us.FkTipoUsuario where us.Activo = 1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "clientes no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "clientes no encontrado" });
                }
            });
        });
    }
}
const excelController = new ExcelController();
exports.default = excelController;
