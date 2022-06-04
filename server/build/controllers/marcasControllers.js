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
class MarcaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT PkMarca, Nombre, Observacion FROM marca where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "marca no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "marca no encontrado" });
                }
            });
        });
    }
    getMarcasFindByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("Select PkMarca, Nombre, Observacion FROM marca WHERE Nombre like '%" + req.params.Valor + "%' and marca.Activo=1 order by marca.nombre", (err, results) => {
                if (err) {
                    res.status(404).json({ text: "marca no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "marca no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        database_1.default.query('SELECT * FROM marca WHERE PkMarca = ?', req.params.PkMarca, (err, results) => {
            if (err) {
                res.status(404).json({ text: "modelo no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "modelo no encontrada." });
            }
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO marca set ?', [req.body]);
            res.json({ text: 'OK' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE marca set Activo = 0 WHERE PkMarca = ?', req.params.PkMarca);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update marca set ? Where PkMarca = ?', [req.body, req.params.PkMarca]);
            res.json({ text: 'OK' });
        });
    }
}
const marcasController = new MarcaController();
exports.default = marcasController;
