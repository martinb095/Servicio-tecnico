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
class InformesController {
    clientesMasVentas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('select IFNULL(ore.FkCliente, 0) Nro, IFNULL(cl.Nombre, "") Nombre, IFNULL(cl.Apellido, "") Apellido, IFNULL(cl.Telefono, "") Telefono, IFNULL(cl.Mail, "") Mail, count(*) Cantidad from ordenreparacion ore left join cliente cl on cl.PkCliente = ore.FkCliente group by FkCliente ORDER BY  count(*) desc;', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "error" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "error" });
                }
            });
        });
    }
    repEntreFechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.FechaDesde, req.body.FechaHasta, req.body.FkEstado);
            const stringSQL = "call repEntreFechas(?,?,?);";
            database_1.default.query(stringSQL, [req.body.FechaDesde, req.body.FechaHasta, req.body.FkEstado], function (err, result) {
                if (err)
                    throw err;
                return res.json(result);
            });
        });
    }
    stockRepuestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call stockRepuestos(?,?);";
            database_1.default.query(stringSQL, [req.body.RepDesde, req.body.RepHasta], function (err, result) {
                if (err)
                    throw err;
                return res.json(result);
            });
        });
    }
}
const informesController = new InformesController();
exports.default = informesController;
