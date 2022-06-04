"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : new P(function(resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class DetalleTareaController {
    //listado de detalletareas
    getDetalleTareas(req, res) {
            return __awaiter(this, void 0, void 0, function*() {
                database_1.default.query('Select * from detalletarea', (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "detalletareas no encontrado" });
                    }
                    if (results) {
                        //return res.json(results[0]);
                        return res.json(results);
                    } else {
                        return res.status(404).json({ text: "detalletareas no encontrado" });
                    }
                });
            });
        }
        //funciona
    GetOne(req, res) {
            return __awaiter(this, void 0, void 0, function*() {
                database_1.default.query('SELECT * FROM detalletarea WHERE PkDetalleTarea = ?', req.params.PkDetalleTarea, (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "detalletareas no encontrado" });
                    }
                    if (results) {
                        return res.json(results[0]);
                    } else {
                        return res.status(404).json({ text: "detalletareas no encontrado" });
                    }
                });
            });
        }
        //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
            return __awaiter(this, void 0, void 0, function*() {
                yield database_1.default.query('INSERT INTO detalletarea set ?', [req.body]);
                res.json({ message: 'detalletarea guardado' });
            });
        }
        //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            yield database_1.default.query('DELETE FROM detalletarea WHERE PkDetalleTarea = ?', req.params.PkDetalleTarea);
            //res.json({ text: 'OK' });
            res.json({ text: 'eliminando detalletarea' + req.params.PkDetalleTarea });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const { id } = req.params;
            yield database_1.default.query('update detalletarea set ? Where PkDetalleTarea = ?', [req.body, id]);
            //res.json({ text: 'actualizado detalletarea' + req.params.PkDetalleTarea });
            res.json({ text: 'OK' });
        });
    }
}
const detalletareasController = new DetalleTareaController();
exports.default = detalletareasController;