import { Request, Response } from 'express';
import pool from '../database';
import { DetalleOrden } from '../Models/detalleorden';


class DetalleOrdenController {

    public async getDetalleOrden(req: Request, res: Response) {
        pool.query('Select * from detalleorden', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detalleorden no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detalleorden no encontrado" });
            }
        });
    }

    public async getFindByOrden(req: Request, res: Response) {    
        const fkOrden = [req.params.FkOrdenRep];     
        pool.query('Select deo.PkDetalleOrden, deo.Cantidad, deo.FkRepuesto, r.Nombre "NombreRep", deo.Precio, deo.Observacion, deo.FkTarea, t.Nombre "NombreTarea", (deo.Precio*deo.Cantidad) as "Total" from detalleorden  deo  left join repuesto r on r.PkRepuesto = deo.FkRepuesto left join tarea t on t.PkTarea = deo.FkTarea where FkOrden = ?', fkOrden, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detalleorden no encontrado" });
            }
            if (results) {                                                     
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detalleorden no encontrado" });
            }
        });
    }


    //funciona
    public async GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM detalleorden WHERE PkDetalleOrden = ?', req.params.PkDetalleOrden, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detalleorden no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "detalleorden no encontrado" });
            }
        });
    }

    public async GetDetallesFindByOrden(req: Request, res: Response) {        
        pool.query('Select deo.PkDetalleOrden, deo.Cantidad, deo.FkRepuesto, r.Nombre as "Repuesto", deo.Precio, deo.Observacion, deo.FkTarea, t.Nombre as "Tarea", FechaCreacion from detalleorden deo  left join repuesto r on r.PkRepuesto = deo.FkRepuesto left join tarea t on t.PkTarea = deo.FkTarea where FkOrden= ?', req.params.FkOrdenrep, (err: any, results: any) => {
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
    public async createServ(item: DetalleOrden) {
        let detalleOrden = {       
            'Cantidad': item.Cantidad,
            'FkRepuesto': item.FkRepuesto,
            'Precio': item.Precio, 
            'Observacion': item.Observacion,
            'Fktarea': item.Fktarea,
            'FechaCreacion': item.FechaCreacion,
            'FkOrden': item.FkOrden,
        }
        await pool.query('INSERT INTO detalleorden set ?', [detalleOrden]);

    }

    public async create(req: Request, res: Response) {
        //let detalleOrden = {       
        //    'Cantidad': req.body.Cantidad,
        //    'FkRepuesto': req.body.FkRepuesto,
        //    'Precio': req.body.Precio, 
        //    'Observacion': req.body.Observacion,
        //    'FkTarea': req.body.FkTarea,
        //    'FechaCreacion': req.body.FechaCreacion,
        //    'FkOrden': req.body.FkOrden,
        //}       
        //await pool.query('INSERT INTO detalleorden set ?', [detalleOrden], function (err: any) {
        //    if (err) throw err;
        //    res.json({ text: 'OK' });
        //});  
        const stringSQL = "call insertDetalleOrden(?,?,?,?,?,?,?);";
        pool.query(stringSQL, [req.body.Cantidad, req.body.FkRepuesto, req.body.Precio, req.body.Observacion, req.body.FkTarea, req.body.FechaCreacion, req.body.FkOrden], function (err: any, results: any) {
            if (err) throw err;                  
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

    public async delete(req: Request, res: Response) {    
        const stringSQL = "call eliminarDetalleOrden(?);";
        pool.query(stringSQL, [req.params.PkDetalleOrden], function (err: any, results: any) {
            if (err) throw err;                  
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });        
    }
    
    public update(req: Request, res: Response) {               
        pool.query('update detalleorden set ? Where PkDetalleOrden = ?', [req.body, req.body.PkDetalleOrden]);
        res.json({ text: 'OK' });
    }
}

const detalleordenController = new DetalleOrdenController();
export default detalleordenController;