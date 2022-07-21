import { Request, Response } from 'express';
import pool from '../database';


class InformesController {   
   
    public async clientesMasVentas(req: Request, res: Response) {        
        pool.query('select IFNULL(ore.FkCliente, 0) Nro, IFNULL(cl.Nombre, "") Nombre, IFNULL(cl.Apellido, "") Apellido, IFNULL(cl.Telefono, "") Telefono, IFNULL(cl.Mail, "") Mail, count(*) Cantidad from ordenreparacion ore left join cliente cl on cl.PkCliente = ore.FkCliente group by FkCliente ORDER BY  count(*) desc;', (err: any, results: any) => {            
            if (err) {
                res.status(404).json({ text: "error" });
            }
            if (results) {                           
                return res.json(results);
            } else {
                return res.status(404).json({ text: "error" });
            }
            
        });
    }

    public async repEntreFechas(req: Request, res: Response) {   
        console.log(req.body.FechaDesde, req.body.FechaHasta, req.body.FkEstado);     
        const stringSQL = "call repEntreFechas(?,?,?);";
        pool.query(stringSQL, [req.body.FechaDesde, req.body.FechaHasta, req.body.FkEstado], function (err: any, result: any) {
           
            if (err) throw err;
            return res.json(result);
            
        });
    }

    public async stockRepuestos(req: Request, res: Response) {            
        const stringSQL = "call stockRepuestos(?,?);";
        pool.query(stringSQL, [req.body.RepDesde, req.body.RepHasta], function (err: any, result: any) {           
            if (err) throw err;
            return res.json(result);
            
        });
    }
}

const informesController = new InformesController();
export default informesController;