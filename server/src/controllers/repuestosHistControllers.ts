import { Request, Response } from 'express';
import pool from '../database';


class RepuestoHistController {

    public async getRepuestosFindByRepuesto(req: Request, res: Response) {
        pool.query("SELECT Fecha, FkRepuesto, Precio FROM repuestohist WHERE FkRepuesto =" + req.params.PkRepuesto + " order by Fecha", (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "repuesto no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "repuesto no encontrado" });
            }
        });
    }   

}


const repuestoHistController = new RepuestoHistController();
export default repuestoHistController;