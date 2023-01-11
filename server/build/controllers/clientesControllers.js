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
class ClienteController {
    //listado de clientes
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select c.PkCliente, c.Nombre, c.Telefono, c.FkCiudad, c.Calle, c.Numero, c.Depto, c.Piso, c.Mail, c.Contrasenia, ciu.FkProvincia as "FkProv", c.Apellido from cliente c left join ciudad ciu on ciu.PkCiudad=c.FkCiudad where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "clientes no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "clientes no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM cliente WHERE PkCliente = ?', req.params.PkCliente, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "clientes no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "clientes no encontrado" });
                }
            });
        });
    }
    getClientesFindByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("Select * FROM cliente WHERE Nombre like '%" + req.params.Valor + "%' and Activo=1 order by nombre", (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO cliente set ?', [req.body]);
            res.json({ text: 'OK' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE cliente set Activo = 0 WHERE PkCliente = ?', req.params.PkCliente);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cliente = {
                'PkCliente': req.body.PkCliente,
                'Nombre': req.body.Nombre,
                'Apellido': req.body.Apellido,
                'Telefono': req.body.Telefono,
                'FkCiudad': req.body.FkCiudad,
                'Calle': req.body.Calle,
                'Numero': req.body.Numero,
                'Piso': req.body.Piso,
                'Depto': req.body.Calle,
                'Mail': req.body.Mail,
                'Contrasenia': req.body.Contrasenia,
                'Activo': true
            };
            yield database_1.default.query('update cliente set ? Where PkCliente = ?', [cliente, req.params.PkCliente]);
            res.json({ text: 'OK' });
            // res.json({ text: 'actualizado cliente' + req.params.PkCliente });
        });
    }
}
const clientesController = new ClienteController();
exports.default = clientesController;
