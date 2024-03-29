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
class EstadosController {
    //listado de estados
    getEstados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select * from estado order by PkEstado', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "estado no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "estado no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        database_1.default.query('SELECT * FROM estado WHERE PkEstado = ?', req.params.PkEstado, (err, results) => {
            if (err) {
                res.status(404).json({ text: "estado no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "estado no encontrado" });
            }
        });
    }
    //listado de estados
    getHistorialEstados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT es.PkEstadoHis, es.Observacion, es.Fecha, es.FkEstado, e.Nombre FROM estadohistorial es left join estado e on e.PkEstado = es.FkEstado where es.FkOrdenRep = ?', req.params.PkOrdenRep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "estado no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "estado no encontrado" });
                }
            });
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO estado set ?', [req.body]);
            res.json({ message: 'estado guardado' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM estado WHERE PkEstado = ?', req.params.PkEstado);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update estado set ? Where PkEstado = ?', [req.body, id]);
            res.json({ text: 'OK' });
        });
    }
}
const estadosController = new EstadosController();
exports.default = estadosController;
