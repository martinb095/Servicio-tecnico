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
class TareaController {
    getTareas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM tarea where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "tarea no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "tarea no encontrado" });
                }
            });
        });
    }
    getTareasSinAsignar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const PkOrdenRep = [req.params.PkOrdenRep];
            database_1.default.query('Select * from tarea where Activo=1 and not exists (select 1 from detalletarea where detalletarea.FkTarea = tarea.PkTarea and detalletarea.FkOrdenRep= ?) order by nombre;', PkOrdenRep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "tarea no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "tarea no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        database_1.default.query('SELECT * FROM tarea WHERE PkTarea = ?', req.params.PkMarca, (err, results) => {
            if (err) {
                res.status(404).json({ text: "tarea no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "tarea no encontrada." });
            }
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call crearTarea(?,?,?);";
            database_1.default.query(stringSQL, [req.body.Nombre, req.body.Costo, req.body.Observacion], function (err, results) {
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
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE tarea set Activo = 0 WHERE PkTarea = ?', req.params.PkTarea);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call actualizarTarea(?,?,?,?);";
            database_1.default.query(stringSQL, [req.body.PkTarea, req.body.Nombre, req.body.Costo, req.body.Observacion], function (err, results) {
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
}
const tareaController = new TareaController();
exports.default = tareaController;
