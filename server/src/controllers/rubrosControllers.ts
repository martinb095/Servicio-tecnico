import { Request, Response } from 'express';
import pool from '../database';

class RubroController {   
   
    public async list(req: Request, res: Response) {        
        pool.query('SELECT * FROM rubro where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "rubro no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "rubro no encontrado" });
            }
        });
    }

    //funciona
    public GetOne(req: Request, res: Response) {      
        pool.query('SELECT * FROM rubro WHERE PkRubro = ?', req.params.PkRubro, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "rubro no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "rubro no encontrada." });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        await pool.query('INSERT INTO rubro set ?', [req.body]);
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE rubro set Activo = 0 WHERE PkRubro = ?', req.params.PkRubro);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response){           
        await pool.query('update rubro set ? Where PkRubro = ?', [req.body, req.params.PkRubro]);
        res.json({ text: 'OK' });
    }

}

const rubroController = new RubroController();
export default rubroController;