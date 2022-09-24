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
class ModeloController {
    getModelos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT m.PkModelo, m.Nombre, m.Observacion, m.FkMarca, m.Nombre as "Marca", m.FkRubro, r.Nombre as "Rubro" FROM modelo m inner join marca on marca.PkMarca=m.FkMarca left join rubro r on r.PkRubro=m.FkRubro where m.Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "modelo no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "modelo no encontrado" });
                }
            });
        });
    }
    getModelosFindByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("Select m.PkModelo, m.Nombre, m.Observacion, m.FkMarca, ma.Nombre as 'Marca', m.FkRubro r.Nombre as 'Rubro' FROM modelo m inner join marca ma on ma.PkMarca=m.FkMarca left join rubro r on r.PkRubro=m.FkRubro WHERE m.Nombre like '%" + req.params.Valor + "%' and m.Activo=1 order by m.nombre", (err, results) => {
                if (err) {
                    res.status(404).json({ text: "modelo no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "modelo no encontrado" });
                }
            });
        });
    }
    getModelosFindByMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM modelo WHERE FkMarca = ? and Activo=1 order by nombre', req.params.FkMarca, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "modelo no encontrada." });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "modelo no encontrada." });
                }
            });
        });
    }
    GetOne(req, res) {
        database_1.default.query('SELECT * from modelo WHERE PkModelo = ?', req.params.PkModelo, (err, results) => {
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
            yield database_1.default.query('INSERT INTO modelo set ?', [req.body]);
            res.json({ text: 'OK' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE modelo set Activo = 0 WHERE PkModelo = ?', req.params.PkModelo);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('update modelo set ? Where PkModelo = ?', [req.body, req.params.PkModelo]);
            res.json({ text: 'OK' });
        });
    }
}
const modeloController = new ModeloController();
exports.default = modeloController;
