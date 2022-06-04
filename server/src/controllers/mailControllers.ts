import { Request, Response } from 'express';
import pool from '../database';
import transporter from '../mailer';

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
            html: 'Su contraseña es .',
        };
        //Envía el correo con el objeto de transporte definido anteriormente
        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {                
                return res.json({ text: error });                  
            }else   {
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
   
    
    
}

const usuarioController = new UsuarioController();
export default usuarioController;