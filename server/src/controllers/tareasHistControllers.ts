import { Request, Response } from 'express';
import pool from '../database';

class TareaHistController {

    public async getTareasFindByTarea(req: Request, res: Response) {
        pool.query("SELECT Fecha, FkTarea, Costo FROM tareahist WHERE FkTarea =" + req.params.PkTarea + " order by Fecha", (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "Tarea no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "Tarea no encontrado" });
            }
        });
    }   

}

const tareaHistController = new TareaHistController();
export default tareaHistController;