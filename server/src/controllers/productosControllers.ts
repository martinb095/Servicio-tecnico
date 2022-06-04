import { Request, Response } from 'express';
import pool from '../database';


class ProductoController {

    public async getProductos(req: Request, res: Response) {
        pool.query('SELECT * FROM producto where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "producto no encontrada." });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "producto no encontrada." });
            }
        });
    }

    public async getProductosFindByNombre(req: Request, res: Response) {
        pool.query("Select * FROM producto WHERE Nombre like '%" + req.params.Valor + "%' and Activo=1 order by nombre", (err: any, results: any) => {

            if (err) {
                res.status(404).json({ text: "producto no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "producto no encontrado" });
            }
        });
    }

    //funciona
    public getOne(req: Request, res: Response) {
        pool.query('SELECT * FROM producto WHERE PkProducto = ?', req.params.PkProducto, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "producto no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "producto no encontrada." });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        let producto = {
            'Nombre': req.body.Nombre,
            'Observacion': req.body.Observacion,
        }
        await pool.query('INSERT INTO producto set ?', producto);
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE producto set Activo = 0 WHERE PkProducto = ?', req.params.PkProducto);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {
        await pool.query('update producto set ? Where PkProducto = ?', [req.body, req.params.PkProducto]);
        res.json({ text: 'OK' });
    }
}

const productosController = new ProductoController();
export default productosController;