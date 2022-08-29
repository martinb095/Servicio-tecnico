import { Request, Response } from 'express';
import pool from '../database';

import { Usuario } from '../Models/usuario';

class LoginController {

    public GetOne(req: Request, res: Response) {
        let usuario = {
            'Nombre': req.body.Nombre,
            'Contrasenia': req.body.Contrasenia,
        }        
        const stringSQL = "call validarUsuario(?,?);";
        pool.query(stringSQL, [usuario.Nombre, usuario.Contrasenia], function (err: any, results: any) {
            if (err) {
                res.status(404).json({ text: "usuario no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "usuario no encontrado" });
            }
        });
    }

    public GetPass(req: Request, res: Response) {               
        pool.query('SELECT Contrasenia FROM usuario WHERE Mail = ? limit 1', [req.params.mail], (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "usuario no encontrada." });
            }
            if (results) {               
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "usuario no encontrada." });
            }
        });
    }


}

const loginController = new LoginController();
export default loginController;