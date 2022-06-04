import { Request, Response } from 'express';
import pool from '../database';
import { DetalleRepuesto } from '../Models/detallerepuesto';


class DetalleRepuestoController {

    //listado de detallerepuestos
    public async getDetalleRepuestos(req: Request, res: Response) {
        pool.query('Select * from detallerepuesto', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detallerepuestos no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detallerepuestos no encontrado" });
            }
        });
    }

    public async getFindByOrden(req: Request, res: Response) {
        const fkOrden=[req.params.FkOrdenRep];
        pool.query('Select * from detallerepuesto where FkOrdenRep = ?', fkOrden, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detallerepuestos no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "detallerepuestos no encontrado" });
            }
        });
    }

    public async GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM detallerepuesto WHERE PkDetallerepuesto = ?', req.params.PkDetalleRepuesto, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "detallerepuesto no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "detallerepuesto no encontrado" });
            }
        });
    }

    //funciona
    public async GetDetallesFindByOrden(req: Request, res: Response) {
        pool.query('Select repuesto.Nombre,Cantidad,Precio from detallerepuesto inner join repuesto on repuesto.PkRepuesto=detallerepuesto.FkRepuesto where FkOrdenRep= ?', req.params.FkOrdenrep, (err: any, results: any) => {
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

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async createServ(item: DetalleRepuesto) {
        let detalleRep = {
            'Cantidad': item.Cantidad,
            'FkRepuesto': item.FkRepuesto,
            'Precio': item.Precio,
            'FkOrdenrep': item.FkOrdenrep,
        }

        await pool.query('INSERT INTO detallerepuesto set ?', [detalleRep]);
    }

    public async create(req: Request, res: Response) {
        console.log(req.body,"req.body");
        let detalleRep = {
            'Cantidad': req.body.Cantidad,
            'FkRepuesto': req.body.FkRepuesto,
            'FkOrdenRep': req.body.FkOrdenrep,
            'Precio': req.body.Precio,
        }
        await pool.query('INSERT INTO detallerepuesto set ?', [detalleRep], function (err: any) {
            if (err) throw err;
        });
    }

    //Para ver q nro esta eliminando
    public async delete(fkordenrep: number) {
        await pool.query('DELETE FROM detallerepuesto WHERE FkOrdenRep = ?', fkordenrep);       
      //  res.json({ text: 'eliminando detallerepuesto' + req.params.PkDetalleRepuesto });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('update detallerepuesto set ? Where PkDetalleRepuesto = ?', [req.body, id]);
        res.json({ text: 'OK' });
        //res.json({ text: 'actualizado detallerepuesto' + req.params.PkDetalleRepuesto });
    }
}

const detallerepuestosController = new DetalleRepuestoController();
export default detallerepuestosController;