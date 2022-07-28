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
class ProveedorController {
    getProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select p.PkProveedor, p.Nombre, p.Firma, p.Cuit, p.FkCiudad, p.Telefono, p.Mail, c.FkProvincia as "FkProv", p.Observacion from proveedor p left join ciudad c on c.PkCiudad=p.FkCiudad where Activo=1 order by nombre', (err, results) => {
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
    //funciona
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM proveedor WHERE PkProveedor = ?', req.params.PkProveedor, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "proveedores no encontrado" });
                }
                if (results) {
                    console.log(results[0]);
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "proveedores no encontrado" });
                }
            });
        });
    }
    getProveedoresFindByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("Select * FROM proveedor WHERE Nombre like '%" + req.params.Valor + "%' and Activo=1 order by nombre", (err, results) => {
                if (err) {
                    res.status(404).json({ text: "proveedor no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "proveedor no encontrado" });
                }
            });
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO proveedor set ?', [req.body]);
            res.json({ text: 'OK' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE proveedor set Activo = 0 WHERE PkProveedor = ?', req.params.PkCliente);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let proveedor = {
                'PkProveedor': req.body.PkProveedor,
                'Nombre': req.body.Nombre,
                'Firma': req.body.Firma,
                'FkCiudad': req.body.FkCiudad,
                'Telefono': req.body.Telefono,
                'Mail': req.body.Mail,
                'Cuit': req.body.Cuit,
                'Observacion': req.body.Observacion,
                'Activo': true
            };
            yield database_1.default.query('update proveedor set ? Where PkProveedor = ?', [proveedor, req.params.PkProveedor]);
            res.json({ text: 'OK' });
            // res.json({ text: 'actualizado cliente' + req.params.PkCliente });
        });
    }
}
const proveedorController = new ProveedorController();
exports.default = proveedorController;
