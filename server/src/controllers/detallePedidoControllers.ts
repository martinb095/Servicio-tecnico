import { Request, Response } from 'express';
import pool from '../database';
import { DetalleOrden } from '../Models/detalleorden';


class DetallePedidoController {
    
    public async getFindByPedido(req: Request, res: Response) {          
        pool.query('Select dp.PkDetallePedido, dp.FkRepuesto, r.Nombre "Repuesto", dp.Observacion, dp.Cantidad from detallepedido dp left join Repuesto r on r.PkRepuesto=dp.FkRepuesto where FkPedProv = ?', req.params.FkPedProv, (err: any, results: any) => {
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

  
    public async create(req: Request, res: Response) {
        let detallePedido = {       
            'FkPedProv': req.body.FkPedProv,
            'FkRepuesto': req.body.FkRepuesto,
            'Cantidad': req.body.Cantidad, 
            'Observacion': req.body.Observacion,         
        }       
        await pool.query('INSERT INTO detallepedido set ?', [detallePedido], function (err: any) {
            if (err) throw err;
            res.json({ text: 'OK' });
        });  
    }

    public async delete(req: Request, res: Response) {               
        await pool.query('DELETE FROM detallepedido WHERE PkDetallePedido = ?',  [req.params.PkDetallePedido]);
        res.json({ text: 'OK' });              
    }
    
    public update(req: Request, res: Response) {     
        pool.query('update detallepedido set ? Where PkDetallePedido = ?', [req.body, req.body.PkDetallePedido]);
        res.json({ text: 'OK' });
    }
}

const detallepedidoController = new DetallePedidoController();
export default detallepedidoController;