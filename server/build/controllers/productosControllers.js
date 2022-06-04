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
class ProductoController {
    getProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM producto where Activo=1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "producto no encontrada." });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "producto no encontrada." });
                }
            });
        });
    }
    getProductosFindByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("Select * FROM producto WHERE Nombre like '%" + req.params.Valor + "%' and Activo=1 order by nombre", (err, results) => {
                if (err) {
                    res.status(404).json({ text: "producto no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "producto no encontrado" });
                }
            });
        });
    }
    //funciona
    getOne(req, res) {
        database_1.default.query('SELECT * FROM producto WHERE PkProducto = ?', req.params.PkProducto, (err, results) => {
            if (err) {
                res.status(404).json({ text: "producto no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "producto no encontrada." });
            }
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let producto = {
                'Nombre': req.body.Nombre,
                'Observacion': req.body.Observacion,
            };
            yield database_1.default.query('INSERT INTO producto set ?', producto);
            res.json({ text: 'OK' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE producto set Activo = 0 WHERE PkProducto = ?', req.params.PkProducto);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('update producto set ? Where PkProducto = ?', [req.body, req.params.PkProducto]);
            res.json({ text: 'OK' });
        });
    }
}
const productosController = new ProductoController();
exports.default = productosController;
