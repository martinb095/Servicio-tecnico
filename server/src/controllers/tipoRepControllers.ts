import { Request, Response } from 'express';
import pool from '../database';

class TipoRepuestoController {   
   
    public async list(req: Request, res: Response) {        
        pool.query('SELECT * FROM tiporepuesto where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "tiporepuesto no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "tiporepuesto no encontrado" });
            }
        });
    }

    //funciona
    public GetOne(req: Request, res: Response) {      
        pool.query('SELECT * FROM tiporepuesto WHERE PkTipoRepuesto = ?', req.params.PkTipoRepuesto, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "TipoRepuesto no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "TipoRepuesto no encontrada." });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        await pool.query('INSERT INTO tiporepuesto set ?', [req.body]);
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE tiporepuesto set Activo = 0 WHERE PkTipoRepuesto = ?', req.params.PkTipoRepuesto);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response){           
        await pool.query('update tiporepuesto set ? Where PkTipoRepuesto = ?', [req.body, req.params.PkTipoRepuesto]);
        res.json({ text: 'OK' });
    }

}

const tiporepuestosController = new TipoRepuestoController();
export default tiporepuestosController;