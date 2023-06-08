import { Request, Response } from 'express';
import pool from '../database';

class TareaController {

    public async getTareas(req: Request, res: Response) {
        pool.query('SELECT * FROM tarea where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "tarea no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "tarea no encontrado" });
            }
        });
    }

    public async getTareasSinAsignar(req: Request, res: Response) {
        const PkOrdenRep = [req.params.PkOrdenRep];
        pool.query('Select * from tarea where Activo=1 and not exists (select 1 from detalletarea where detalletarea.FkTarea = tarea.PkTarea and detalletarea.FkOrdenRep= ?) order by nombre;', PkOrdenRep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "tarea no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "tarea no encontrado" });
            }
        });
    }

    //funciona
    public GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM tarea WHERE PkTarea = ? and Activo=1', req.params.PkTarea, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "tarea no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "tarea no encontrada." });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        const stringSQL = "call insertTarea(?,?,?);";
        pool.query(stringSQL, [req.body.Nombre, req.body.Costo, req.body.Observacion], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });       
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE tarea set Activo = 0 WHERE PkTarea = ?', req.params.PkTarea);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {      
        const stringSQL = "call actualizarTarea(?,?,?,?);";
        pool.query(stringSQL, [req.body.PkTarea, req.body.Nombre, req.body.Costo, req.body.Observacion], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }
}

const tareaController = new TareaController();
export default tareaController;