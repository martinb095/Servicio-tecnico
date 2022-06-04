import { Request, Response } from 'express';
import pool from '../database';


class EstadosController {
    //listado de estados
    public async getEstados(req: Request, res: Response) {
        pool.query('Select * from estado order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "estado no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "estado no encontrado" });
            }
        });
    }

    //funciona
    public GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM estado WHERE PkEstado = ?', req.params.PkEstado, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "estado no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "estado no encontrado" });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        await pool.query('INSERT INTO estado set ?', [req.body]);
        res.json({ message: 'estado guardado' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('DELETE FROM estado WHERE PkEstado = ?', req.params.PkEstado);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('update estado set ? Where PkEstado = ?', [req.body, id]);
        res.json({ text: 'OK' });
    }
}

const estadosController = new EstadosController();
export default estadosController;