import { Request, Response } from 'express';
import pool from '../database';
import { inspect } from 'util' // or directly
import { text } from 'body-parser';
import { promises } from 'dns';

class MarcaController {   
   

    public async list(req: Request, res: Response) {        
        pool.query('SELECT PkMarca, Nombre, Observacion FROM marca where Activo=1 order by nombre', (err: any, results: any) => {            
            if (err) {
                res.status(404).json({ text: "marca no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "marca no encontrado" });
            }
        });
    }

    public async getMarcasFindByNombre(req: Request, res: Response) {
        pool.query("Select PkMarca, Nombre, Observacion FROM marca WHERE Nombre like '%" + req.params.Valor + "%' and marca.Activo=1 order by marca.nombre", (err: any, results: any) => {

            if (err) {
                res.status(404).json({ text: "marca no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "marca no encontrado" });
            }
        });
    }

    //funciona
    public GetOne(req: Request, res: Response) {      
         pool.query('SELECT * FROM marca WHERE PkMarca = ?', req.params.PkMarca, (err: any, results: any) => {      
          
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
        await pool.query('INSERT INTO marca set ?', [req.body]);
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE marca set Activo = 0 WHERE PkMarca = ?', req.params.PkMarca);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response){
        const { id } = req.params;
        await pool.query('update marca set ? Where PkMarca = ?', [req.body,req.params.PkMarca]);
        res.json({ text: 'OK' });
    }

    //public async MarcasFindByProducto(req: Request, res: Response)  {  
    //    const idProducto = req.params.FkProducto;
    //    pool.query('SELECT * FROM marca WHERE FkProducto = ? and Activo=1 order by nombre', [idProducto], (err: any, results: any) => {
    //        if (err) {
    //            res.status(404).json({ text: "marca no encontrada." });
    //        }
    //        if (results) {
    //            return res.json(results);
    //        } else {
    //            return res.status(404).json({ text: "marca no encontrada." });
    //        }
    //    });
    //}
//

}

const marcasController = new MarcaController();
export default marcasController;