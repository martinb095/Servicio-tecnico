import { Request, Response } from 'express';
import pool from '../database';


class InformesController {

    public async clientesMasVentas(req: Request, res: Response) {
        pool.query('select IFNULL(ore.FkCliente, 0) Nro, IFNULL(cl.Nombre, "") Nombre, IFNULL(cl.Apellido, "") Apellido, IFNULL(cl.Telefono, "") Teléfono, IFNULL(cl.Mail, "") Mail, count(*) Cantidad from ordenreparacion ore left join cliente cl on cl.PkCliente = ore.FkCliente group by FkCliente ORDER BY  count(*) desc;', (err: any, results: any) => {
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

    public async ordenRepEstados(req: Request, res: Response) {
        pool.query('select FkEstado, count(*) Cantidad from ordenreparacion where FechaInicio between ? and ? group by FkEstado;', [req.body.FechaDesde, req.body.FechaHasta], (err: any, results: any) => {
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

    public async repMasUtilizados(req: Request, res: Response) {
        pool.query('select FkRepuesto, r.Nombre, count(*) as "Cantidad" from detalleorden dor left join repuesto r on r.PkRepuesto = dor.FkRepuesto left join ordenreparacion ore on ore.PkOrdenreparacion = dor.FkOrden where FechaInicio between ? and ? group by FkRepuesto, r.Nombre order by count(*) desc LIMIT 5;', [req.body.FechaDesde, req.body.FechaHasta], (err: any, results: any) => {
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

    public async getDetalleOrden(req: Request, res: Response) {
        const fkOrden = [req.params.FkOrdenRep];
        pool.query('Select deo.PkDetalleOrden, IFNULL(deo.Cantidad, 0) AS Cantidad, IFNULL(deo.FkRepuesto, 0) AS FkRepuesto, IFNULL(r.Nombre, "") AS "Repuesto", IFNULL(deo.Precio, 0) AS "Precio $", IFNULL(deo.Observacion, "") AS Observacion, IFNULL(deo.FkTarea, 0) AS FkTarea, IFNULL(t.Nombre, "") AS "Tarea", IFNULL(deo.Costo, 0) AS "Costo $", ((IFNULL(deo.Precio, 0) * IFNULL(deo.Cantidad, 0)) + IFNULL(deo.Costo, 0)) AS "Total $" from detalleorden deo left join repuesto r on r.PkRepuesto = deo.FkRepuesto left join tarea t on t.PkTarea = deo.FkTarea where FkOrden = ?', fkOrden, (err: any, results: any) => {
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

    //obtener detalle de una orden 
    public async getDetalleEstadoOrden(req: Request, res: Response) {
        pool.query('SELECT ore.FecRetiroEstimado, ore.DescripProblema, ore.Observacion, ore.FkModelo, mo.Nombre as "Modelo", mo.FkMarca, ma.Nombre "Marca", ore.FkCliente, c.Nombre, c.Apellido, c.Telefono, c.Mail, ore.FkEstado, est.Nombre as "Estado", FechaInicio FROM ordenreparacion ore left join Modelo mo on mo.PkModelo=ore.FkModelo left join Marca ma on ma.PkMarca=mo.FkMarca left join Estado est on est.PkEstado=ore.FkEstado left join Cliente c on c.PkCliente=FkCliente where PkOrdenreparacion=?;', req.params.PkOrdenRep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });

    }

    public async getDetallePresupuesto(req: Request, res: Response) {           
        pool.query('select dp.PkDetallePresup, dp.FkRepuesto, r.Nombre "Repuesto", dp.Observacion, dp.Cantidad, dp.Precio as "Precio $", (dp.Precio*dp.Cantidad) "Total $", dp.FkPresupuesto, dp.FkTarea, t.Nombre "Tarea", dp.Costo as "Costo $" from detallepresupuesto dp left join tarea t on t.PkTarea=dp.FkTarea left join repuesto r on r.PkRepuesto=dp.FkRepuesto where dp.FkPresupuesto = ?', req.params.FkPresupuesto, (err: any, results: any) => {
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
    
    public async getPresORMasUti(req: Request, res: Response) {           
        const stringSQL = "call repPresMasUtilizados(?,?);";
        pool.query(stringSQL, [req.body.FechaDesde, req.body.FechaHasta], function (err: any, result: any) {
            if (err) throw err;
            return res.json(result[0]);
        });
    }
}

const informesController = new InformesController();
export default informesController;