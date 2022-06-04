import { Request, Response } from 'express';
import pool from '../database';
import { DetalleTarea } from '../Models/detalletarea';


class DetalleTareaController {

    //listado de detalletareas
    public async getDetalleTareas(req: Request, res: Response) {
        pool.query('Select * from detalletarea', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detalletareas no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detalletareas no encontrado" });
            }
        });
    }

    public async getFindByOrden(req: Request, res: Response) {
        const fkOrden = [req.params.FkOrdenRep];
        // pool.query('Select * from detalletarea where FkOrdenRep = ?', req.params.FkOrdenrep, (err: any, results: any) => {
        pool.query('Select * from detalletarea where FkOrdenRep = ?', fkOrden, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detalletarea no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);                
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detalletarea no encontrado" });
            }
        });
    }


    //funciona
    public async GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM detalletarea WHERE PkDetalleTarea = ?', req.params.PkDetalleTarea, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detalletareas no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "detalletareas no encontrado" });
            }
        });
    }

    //funciona
    public async GetDetallesFindByOrden(req: Request, res: Response) {
        pool.query('Select tarea.Nombre, detalletarea.Costo from detalletarea inner join tarea on tarea.PkTarea=detalletarea.FkTarea where FkOrdenRep= ?', req.params.FkOrdenrep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detallerepuestos no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detallerepuestos no encontrado" });
            }
        });
    }

    //PAra crear desde el servidor
    public async createServ(item: DetalleTarea) {
        let detalleTarea = {
            'FkTarea': item.FkTarea,
            'Costo': item.Costo,
            'FkOrdenrep': item.FkOrdenRep,
        }
        await pool.query('INSERT INTO detalletarea set ?', [detalleTarea]);

    }

    public async create(req: Request, res: Response) {
        let detalleTarea = {
            'FkTarea': req.body.FkTarea,
            'Costo': req.body.Costo,
            'FkOrdenRep': req.body.FkOrdenrep,
        }
        await pool.query('INSERT INTO detalletarea set ?', [detalleTarea], function (err: any) {
            if (err) throw err;
        });
    }

    public async delete(fkordenrep: number) {
        console.log(fkordenrep, "fkordenrep")
        await pool.query('DELETE FROM detalletarea WHERE FkOrdenRep = ?', fkordenrep);
        // res.json({ text: 'eliminando detalletarea' + req.params.FkOrdenRep });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('update detalletarea set ? Where PkDetalleTarea = ?', [req.body, id]);
        res.json({ text: 'OK' });
    }
}

const detalletareasController = new DetalleTareaController();
export default detalletareasController;