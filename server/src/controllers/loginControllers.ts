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
        pool.query(stringSQL, [usuario.Nombre, usuario.Contrasenia], function (err: any, usuarioDb: Usuario[]) {
            if (err) throw err;
            var string = JSON.stringify(usuarioDb[0]);
            var json = JSON.parse(string);
            try {
                let id = json[0].PkUsuario
                return res.status(200).json({ exist: true });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

}

const loginController = new LoginController();
export default loginController;