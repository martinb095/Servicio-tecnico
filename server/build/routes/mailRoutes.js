"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailer_1 = __importDefault(require("../mailer"));
const mailControllers_1 = __importDefault(require("../controllers/mailControllers"));
class MailRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', (req) => {
            // configura los datos del correo
            var mailOptions = {
                from: 'softwaremarbal_soporte@outlook.com',
                to: req.body.Mail,
                subject: 'Estado de su orden',
                html: "<html>" +
                    '<h3>El estado de su orden a sido cambiado a ' + req.body.Estado + ', recuerde que la fecha de retiro estimada es ' + req.body.FechaRetiro + '.</h3>' +
                    "<h3>¡Muchas gracias!</h3>" +
                    "</html>",
            };
            // Envía el correo con el objeto de transporte definido anteriormente
            mailer_1.default.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Mensaje enviado: ' + info.response);
            });
        });
        this.router.post('/recuperarpass', mailControllers_1.default.recuperarPass);
        this.router.get('/obtenerMail/:Mail', mailControllers_1.default.GetPass);
        this.router.post('/enviarwsp', mailControllers_1.default.enviarWsp);
    }
}
const mailRoutes = new MailRoutes();
exports.default = mailRoutes.router;
