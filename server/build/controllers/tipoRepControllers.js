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
class TipoRepuestoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM tiporepuesto where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "tiporepuesto no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "tiporepuesto no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        database_1.default.query('SELECT * FROM tiporepuesto WHERE PkTipoRepuesto = ?', req.params.PkTipoRepuesto, (err, results) => {
            if (err) {
                res.status(404).json({ text: "TipoRepuesto no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "TipoRepuesto no encontrada." });
            }
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tiporepuesto set ?', [req.body]);
            res.json({ text: 'OK' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE tiporepuesto set Activo = 0 WHERE PkTipoRepuesto = ?', req.params.PkTipoRepuesto);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('update tiporepuesto set ? Where PkTipoRepuesto = ?', [req.body, req.params.PkTipoRepuesto]);
            res.json({ text: 'OK' });
        });
    }
}
const tiporepuestosController = new TipoRepuestoController();
exports.default = tiporepuestosController;
