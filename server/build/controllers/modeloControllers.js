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
class ModeloController {
    getModelos(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            database_1.default.query('SELECT * FROM modelo', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "modelo no encontrado" });
                }
                if (results) {
                    return res.json(results);
                } else {
                    return res.status(404).json({ text: "modelo no encontrado" });
                }
            });
        });
    }
    findByProducto(req, res) {
            return __awaiter(this, void 0, void 0, function*() {
                const idProducto = req.params.FkProducto;
                database_1.default.query('SELECT * FROM modelo WHERE FkProducto = ?', [idProducto], (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "modelo no encontrada." });
                    }
                    if (results) {
                        return res.json(results);
                    } else {
                        return res.status(404).json({ text: "modelo no encontrada." });
                    }
                });
            });
        }
        //funciona
    GetOne(req, res) {
            const id = req.params.PkMarca;
            database_1.default.query('SELECT * FROM modelo WHERE PkModelo = ?', [id], (err, results) => {
                if (err) {
                    res.status(404).json({ text: "modelo no encontrada." });
                }
                if (results) {
                    return res.json(results[0]);
                } else {
                    return res.status(404).json({ text: "modelo no encontrada." });
                }
            });
        }
        //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
            return __awaiter(this, void 0, void 0, function*() {
                yield database_1.default.query('INSERT INTO modelo set ?', [req.body]);
                res.json({ message: 'modelo guardada' });
            });
        }
        //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            yield database_1.default.query('DELETE FROM modelo WHERE PkModelo = ?', req.params.PkModelo);
            res.json({ text: 'OK' });
            //res.json({ text: 'eliminando modelo' + req.params.PkModelo });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const { id } = req.params;
            yield database_1.default.query('update modelo set ? Where PkModelo = ?', [req.body, id]);
            console.log("aa");
            res.json({ text: 'OK' });
            //res.json({ text: 'actualizado modelo' + req.params.PkModelo });
        });
    }
}
const modeloController = new ModeloController();
exports.default = modeloController;