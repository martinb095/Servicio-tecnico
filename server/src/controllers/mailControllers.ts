import { Request, Response } from 'express';
import pool from '../database';
import transporter from '../mailer';

const TWILIO_ID = 'ACd645517d385bbd78deda0200b9eb7818'
const TWILIO_SK = '5fd03e9c5522ae4f27d95732b8a4e61a'
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
            subject: 'Software Marbal',
            html: "<html>" +
                "<h3></h3>" +
                "<h3>Recientemente has solicitado la contraseña de ingreso, la misma es:</h3>" +
                "<h2>" + req.body.contrasenia + "</h2>" +
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

        // let datosWsp = {
        //     'Nro': req.body.Nro,
        //     'Mensaje': req.body.FecRetiroEstimado,
        // }       
        //body: req.body.Mensaje,
        console.log(req.body);
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: req.body.Mensaje,
                to: 'whatsapp:+5493537665239'// + req.body.Nro
            }).then();
    }

}

const usuarioController = new UsuarioController();
export default usuarioController;