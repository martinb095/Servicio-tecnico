import { Request, Response } from 'express';
import pool from '../database';
import transporter from '../mailer';

const TWILIO_ID = 'ACd645517d385bbd78deda0200b9eb7818'
const TWILIO_SK = 'f543f9207b42fbe2e33c6fafeb842a94'
const client = require('twilio')(TWILIO_ID, TWILIO_SK);

class UsuarioController {


    public GetOne(req: Request, res: Response) {
        pool.query('SELECT top 1 Contrasenia from usuario WHERE PkModelo = ?', req.params.Mail, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "usuario no encontrado." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "usuario no encontrado." });
            }
        });
    }

    public recuperarPass(req: Request, res: Response) {
        var mailOptions = {
            from: 'softwaremarbal_soporte@outlook.com',
            to: req.body.mail,
            subject: 'Recuperar contraseña',
            html: "<html>" +
                "<h2>Recuperar contraseña</h2>" +
                "<h3>Su contraseña es:</h3>" +
                "<h3>" + req.body.contrasenia + "</h3>" +
                "</html>",
        };
        //Envía el correo con el objeto de transporte definido anteriormente
        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                return res.json({ text: error });
            } else {
                return res.json({ text: 'OK' });
            }
        });
    }

    public GetPass(req: Request, res: Response) {
        pool.query('SELECT top 1 Contrasenia from usuario WHERE Mail = ?', req.params.Mail, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "Usuario no encontrado." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "Usuario no encontrado." });
            }
        });
    }
    public enviarWsp(req: Request, res: Response) {

        let datosWsp = {
            'Nro': req.body.Nro,
            'Mensaje': req.body.FecRetiroEstimado,
        }       
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: req.body.Mensaje,
                to: 'whatsapp:' + req.body.Nro
            }).then();
    }

}

const usuarioController = new UsuarioController();
export default usuarioController;