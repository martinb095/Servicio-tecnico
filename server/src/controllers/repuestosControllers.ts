import { Request, Response } from 'express';
import pool from '../database';
import { Repuesto } from '../Models/repuesto';
import { any } from 'bluebird';

class RepuestoController {

    public async getRepuestos(req: Request, res: Response) {
        if (req.params.FkTipoRepuesto > 0) {
            pool.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.Imagen FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 and r.FkTipoRepuesto = ? order by nombre', req.params.FkTipoRepuesto, (err: any, results: any) => {
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
            pool.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.Imagen FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 order by nombre', (err: any, results: any) => {
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
        pool.query("SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.FkTipoRepuesto, r.Observacion, r.NroSerie, tr.Nombre as 'TipoRepuesto', m.Nombre as 'Marca', r.Imagen FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Nombre like '%" + req.params.Valor + "%' and r.Activo = 1 order by r.nombre", (err: any, results: any) => {
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
        pool.query('SELECT * FROM repuesto WHERE PkRepuesto = ?', req.params.PkMarca, (err: any, results: any) => {
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

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    // public async create(req: Request, res: Response) {
    //     console.log([req.body],"aaaaaaaa")        
    //     await pool.query('INSERT INTO repuesto set ?', [req.body]);    
    // }

    public async create(req: Request, res: Response) {

        // let repuesto = {
        //     'Nombre': req.body.Nombre,
        //     'PrecioCosto': req.body.PrecioCosto,
        //     'PrecioVenta': req.body.PrecioVenta,
        //     'CantidadStock': req.body.CantidadStock,
        //     'Observacion': req.body.Observacion,
        //     'NroSerie': req.body.NroSerie,
        //     'FkTipoRepuesto': req.body.FkTipoRepuesto,
        // }
        // console.log([repuesto]);

        await pool.query('INSERT INTO repuesto set ?', [req.body], function (err: any, resultInserOrd: any) {
            if (err) throw err;
            const ultimoRep = resultInserOrd.insertId;
            res.json({ text: 'OK' });
        });
        // await pool.query('INSERT INTO repuesto set ?', [req.body]);   
        // const ultimoRep = res.insertId; 
        // return ultimoRep;
        // res.json({ message: 'repeusto guardado' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE repuesto set Activo = 0 WHERE PkRepuesto = ?', req.params.PkRepuesto);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {
        let repuesto: Repuesto = {
            'PkRepuesto': req.body.PkRepuesto,
            'Nombre': req.body.Nombre,
            'PrecioCosto': req.body.PrecioCosto,
            'PrecioVenta': req.body.PrecioVenta,
            'Observacion': req.body.Observacion,
            'CantidadStock': req.body.CantidadStock,
            'FkTipoRepuesto': req.body.FkTipoRepuesto,
            'FkMarca': req.body.FkMarca,
            'NroSerie': req.body.NroSerie,
            'Activo': true
        }
        await pool.query('update repuesto set ? Where PkRepuesto = ?', [repuesto, req.params.PkRepuesto]);
        res.json({ text: 'OK' });
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