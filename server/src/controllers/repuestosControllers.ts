import { Request, Response } from 'express';
import pool from '../database';
import { Repuesto } from '../Models/repuesto';

class RepuestoController {

    public async getRepuestos(req: Request, res: Response) {
        if (req.params.FkTipoRepuesto > 0) {            
            pool.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 and r.FkTipoRepuesto = ? order by nombre', req.params.FkTipoRepuesto, (err: any, results: any) => {
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
        else {            
            pool.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 order by nombre', (err: any, results: any) => {
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

    public async getRepuestosCompleto(req: Request, res: Response) {
        if (req.params.FkTipoRepuesto > 0) {            
            pool.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where r.Activo = 1 and r.FkTipoRepuesto = ? order by nombre', req.params.FkTipoRepuesto, (err: any, results: any) => {
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
        else {            
            pool.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where r.Activo = 1 order by nombre', (err: any, results: any) => {
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

    public async getRepuestosFindByNombre(req: Request, res: Response) {
        pool.query("SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.FkTipoRepuesto, r.Observacion, r.NroSerie, tr.Nombre as 'TipoRepuesto', m.Nombre as 'Marca', r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Nombre like '%" + req.params.Valor + "%' and r.Activo = 1 order by r.nombre", (err: any, results: any) => {
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

    public GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM repuesto WHERE PkRepuesto = ? and CantidadStock > 0 and Activo = 1', req.params.PkRepuesto, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "repuesto no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "repuesto no encontrada." });
            }
        });
    }

    public async create(req: Request, res: Response) {        
        const stringSQL = "call insertRepuesto(?,?,?,?,?,?,?,?);";    
        pool.query(stringSQL, [req.body.Nombre, req.body.PrecioCosto, req.body.PrecioVenta, req.body.Observacion, req.body.CantidadStock, req.body.FkTipoRepuesto, req.body.FkMarca, req.body.NroSerie], function (err: any, results: any) {
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
        await pool.query('UPDATE repuesto set Activo = 0 WHERE PkRepuesto = ?', req.params.PkRepuesto);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {     
        const stringSQL = "call actualizarRepuesto(?,?,?,?,?,?,?,?,?);";
        pool.query(stringSQL, [req.body.PkRepuesto, req.body.Nombre, req.body.PrecioCosto, req.body.PrecioVenta, req.body.Observacion, req.body.CantidadStock, req.body.FkTipoRepuesto, req.body.FkMarca, req.body.NroSerie], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });              
    }


    public async getRepuestosSinAsignar(req: Request, res: Response) {
        const PkOrdenRep = [req.params.PkOrdenRep];
        pool.query('Select * from repuesto where CantidadStock>0 and not exists (select 1 from detallerepuesto where detallerepuesto.FkRepuesto = repuesto.PkRepuesto and detallerepuesto.FkOrdenRep= ? and repuesto.Activo=1) order by nombre;', PkOrdenRep, (err: any, results: any) => {
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


const repuestoController = new RepuestoController();
export default repuestoController;