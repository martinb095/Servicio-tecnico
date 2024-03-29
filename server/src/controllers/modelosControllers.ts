import { Request, Response } from 'express';
import pool from '../database';

class ModeloController {

    public async getModelos(req: Request, res: Response) {
        pool.query('SELECT m.PkModelo, m.Nombre, m.Observacion, m.FkMarca, mar.Nombre as "Marca", m.FkRubro, r.Nombre as "Rubro" FROM modelo m inner join marca mar on mar.PkMarca=m.FkMarca left join rubro r on r.PkRubro=m.FkRubro where m.Activo=1 order by M.nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "modelo no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "modelo no encontrado" });
            }
        });
    }

    public async getModelosFindByNombre(req: Request, res: Response) {
        console.log(req.params.Valor);
        pool.query("Select m.PkModelo, m.Nombre, m.Observacion, m.FkMarca, ma.Nombre as 'Marca', m.FkRubro, r.Nombre as 'Rubro' FROM modelo m inner join marca ma on ma.PkMarca=m.FkMarca left join rubro r on r.PkRubro=m.FkRubro WHERE m.Nombre like '%" + req.params.Valor + "%' and m.Activo=1 order by m.nombre", (err: any, results: any) => {

            if (err) {
                res.status(404).json({ text: "modelo no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "modelo no encontrado" });
            }
        });
    }


    public async getModelosFindByMarca(req: Request, res: Response) {
        pool.query('SELECT * FROM modelo WHERE FkMarca = ? and Activo=1 order by nombre', req.params.FkMarca, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "modelo no encontrada." });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "modelo no encontrada." });
            }
        });
    }

    public GetOne(req: Request, res: Response) {
        pool.query('SELECT * from modelo WHERE PkModelo = ?', req.params.PkModelo, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "modelo no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "modelo no encontrada." });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        await pool.query('INSERT INTO modelo set ?', [req.body]);
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE modelo set Activo = 0 WHERE PkModelo = ?', req.params.PkModelo);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {   
        await pool.query('update modelo set ? Where PkModelo = ?', [req.body, req.params.PkModelo]);
        res.json({ text: 'OK' });
    }
}

const modeloController = new ModeloController();
export default modeloController;