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
class PedidoController {
    getPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select p.PkPedProv, p.FkProveedor, prov.Firma, p.FechaCreacion, p.Observacion from Pedido p left join proveedor prov on prov.PkProveedor=p.FkProveedor order by p.PkPedProv;', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "pedidos no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "pedidos no encontrado" });
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select p.FkProveedor, prov.Firma, prov.Telefono, prov.Mail, p.FechaCreacion, p.Observacion from pedido p left join Proveedor prov on p.FkProveedor = prov.PkProveedor where PkPedProv=?;', req.params.PkPedProv, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "pedido no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "pedido no encontrado" });
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call deletePedido(?,?);";
            database_1.default.query(stringSQL, [req.params.PkPedProv], function (err, results) {
                if (err)
                    throw err;
                try {
                    return res.json({ text: 'OK' });
                }
                catch (error) {
                    return res.status(200).json({ exist: false });
                }
            });
        });
    }
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call procesarPedido(?);";
            database_1.default.query(stringSQL, [req.params.PkPedProv], function (err, results) {
                if (err)
                    throw err;
                try {
                    return res.json({ text: 'OK' });
                }
                catch (error) {
                    return res.status(200).json({ exist: false });
                }
            });
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pedido = {
                'FkProveedor': req.body.FkProveedor,
                'FechaCreacion': req.body.FechaCreacion,
                'Observacion': req.body.Observacion,
            };
            //Registro la orden          
            yield database_1.default.query('INSERT INTO pedido SET ?', [pedido], function (err, resultInser) {
                if (err)
                    throw err;
                const ultimo = resultInser.insertId;
                res.json({ message: ultimo });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.Observacion);
            let pedido = {
                'Observacion': req.body.Observacion,
            };
            yield database_1.default.query('update pedido set ? Where PkPedProv = ?', [pedido, req.params.PkPedProv], function (err, res) {
                if (err)
                    throw err;
            });
            res.json({ text: 'OK' });
        });
    }
}
const pedidosController = new PedidoController();
exports.default = pedidosController;
