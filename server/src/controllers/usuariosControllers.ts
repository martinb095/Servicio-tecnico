import { Request, Response } from 'express';
import pool from '../database';


class UsuarioController {

    public async getUsuarios(req: Request, res: Response) {
        pool.query('SELECT us.PkUsuario, us.Nombre, us.Contrasenia, us.FkTipoUsuario, tu.TipoUsuario "Tipo", us.UltimoIngreso, us.Mail FROM usuario us left join tipousuario tu on tu.PkTipoUsuario =  us.FkTipoUsuario where us.Activo = 1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "usuario no encontrada." });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "usuario no encontrada." });
            }
        });
    }

    //Obtiene el usuario segun los parametros
    public getOne(req: Request, res: Response) {
        pool.query('SELECT * FROM usuario WHERE Nombre = ? and Contrasenia = ?', [req.params.Nombre, req.params.Contrasenia], (err: any, results: any) => {
            if (err) {
                res.status(500).json({ text: "error al buscar" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "usuario no encontrada." });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {        
        const stringSQL = "CALL insertUsuario(?, ?, ?, ?);";
        pool.query(stringSQL, [req.body.Nombre, req.body.Contrasenia, req.body.FkTipoUsuario, req.body.Mail], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: results[0] });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE usuario set Activo = 0 WHERE PkUsuario = ?', req.params.PkUsuario);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {
        console.log(req.body, req.params.PkUsuario);
        const stringSQL = "CALL actualizarUsuario(?, ?, ?, ?, ?);";
        pool.query(stringSQL, [req.params.PkUsuario,req.body.Nombre, req.body.Contrasenia, req.body.FkTipoUsuario, req.body.Mail], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: results[0] });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });

    }
}

const usuariosController = new UsuarioController();
export default usuariosController;