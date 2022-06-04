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
class UsuarioController {
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM usuario where Activo = 1 order by nombre', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "usuario no encontrada." });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "usuario no encontrada." });
                }
            });
        });
    }
    //Obtiene el usuario segun los parametros
    getOne(req, res) {
        database_1.default.query('SELECT * FROM usuario WHERE Nombre = ? and Contrasenia = ?', [req.params.Nombre, req.params.Contrasenia], (err, results) => {
            if (err) {
                res.status(500).json({ text: "error al buscar" });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "usuario no encontrada." });
            }
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO usuario set ?', [req.body]);
            res.json({ message: 'usuario guardada' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE usuario set Activo = 0 WHERE PkUsuario = ?', req.params.PkUsuario);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('update usuario set ? Where PkUsuario = ?', [req.body, req.params.PkUsuario]);
            res.json({ text: 'OK' });
        });
    }
}
const usuariosController = new UsuarioController();
exports.default = usuariosController;
