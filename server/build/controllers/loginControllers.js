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
        database_1.default.query(stringSQL, [usuario.Nombre, usuario.Contrasenia], function (err, usuarioDb) {
            if (err)
                throw err;
            var string = JSON.stringify(usuarioDb[0]);
            var json = JSON.parse(string);
            try {
                let id = json[0].PkUsuario;
                return res.status(200).json({ exist: true });
            }
            catch (error) {
                return res.status(200).json({ exist: false });
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
