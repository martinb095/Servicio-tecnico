"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const mailer_1 = __importDefault(require("../mailer"));
class UsuarioController {
    GetOne(req, res) {
        database_1.default.query('SELECT top 1 Contrasenia from usuario WHERE PkModelo = ?', req.params.Mail, (err, results) => {
            if (err) {
                res.status(404).json({ text: "usuario no encontrado." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "usuario no encontrado." });
            }
        });
    }
    recuperarPass(req, res) {
        var mailOptions = {
            from: 'softwaremarbal_soporte@outlook.com',
            to: req.body.mail,
            subject: 'Recuperar contraseña',
            html: 'Su contraseña es .',
        };
        //Envía el correo con el objeto de transporte definido anteriormente
        mailer_1.default.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ text: error });
            }
            else {
                return res.json({ text: 'OK' });
            }
        });
    }
    GetPass(req, res) {
        database_1.default.query('SELECT top 1 Contrasenia from usuario WHERE Mail = ?', req.params.Mail, (err, results) => {
            if (err) {
                res.status(404).json({ text: "Usuario no encontrado." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "Usuario no encontrado." });
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
