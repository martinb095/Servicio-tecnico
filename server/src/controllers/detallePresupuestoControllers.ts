import { Request, Response } from 'express';
import pool from '../database';


class DetallePresupuestoController {
    
    public async getFindByPresupuesto(req: Request, res: Response) {    
        //const FkPedProv = [req.params.FkPedProv];     
        //console.log(FkPedProv);
        pool.query('select dp.PkDetallePresup, dp.FkRepuesto, r.Nombre "Repuesto", dp.Observacion, dp.Cantidad,dp.Precio, dp.FkPresupuesto, dp.FkTarea, t.Nombre "Tarea" from detallepresupuesto dp left join tarea t on t.PkTarea=dp.FkTarea left join repuesto r on r.PkRepuesto=dp.FkRepuesto where dp.FkPresupuesto = ?', req.params.FkPresupuesto, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detallepresu no encontrado" });
            }
            if (results) {                                                     
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detallepresu no encontrado" });
            }
        });
    }

  
    public async create(req: Request, res: Response) {
        let detallePresupuesto = {       
            'FkPedProv': req.body.FkRepuesto,
            'Precio': req.body.Precio,
            'Cantidad': req.body.Cantidad, 
            'Observacion': req.body.Observacion,        
            'FkPresupuesto': req.body.FkPresupuesto,   
            'FkTarea': req.body.FkTarea,    
        }       
        await pool.query('INSERT INTO detallepresupuesto set ?', [detallePresupuesto], function (err: any) {
            if (err) throw err;
            res.json({ text: 'OK' });
        });  
    }

    public async delete(req: Request, res: Response) {               
        await pool.query('DELETE FROM detallepresupuesto WHERE PkDetallePresup = ?',  [req.params.PkDetallePresup]);
        res.json({ text: 'OK' });              
    }
    
    public update(req: Request, res: Response) {        
        console.log("req.body");   
        console.log(req.body);      
        pool.query('update detallepresupuesto set ? Where PkDetallePresup = ?', [req.body, req.body.PkDetallePresup]);
        res.json({ text: 'OK' });
    }
}

const detallePresupuestoController = new DetallePresupuestoController();
export default detallePresupuestoController;