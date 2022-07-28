"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class LoginController {
    GetOne(req, res) {
        let usuario = {
            'Nombre': req.body.Nombre,
            'Contrasenia': req.body.Contrasenia,
        };
        const stringSQL = "call validarUsuario(?,?);";
        database_1.default.query(stringSQL, [usuario.Nombre, usuario.Contrasenia], function (err, results) {
            if (err) {
                res.status(404).json({ text: "usuario no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "usuario no encontrado" });
            }
        });
    }
    GetPass(req, res) {
        database_1.default.query('SELECT Contrasenia FROM usuario WHERE Mail = ? limit 1', [req.params.mail], (err, results) => {
            if (err) {
                res.status(404).json({ text: "usuario no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "usuario no encontrada." });
            }
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
