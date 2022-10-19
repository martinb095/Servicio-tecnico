import { Request, Response } from 'express';
import pool from '../database';


class PresupuestoController {

    public async getPresupuestos(req: Request, res: Response) {
        pool.query('SELECT p.PkPresupuesto, p.FKCliente, c.Nombre, c.Apellido, p.FechaVigencia, p.FechaCreacion, p.Observacion, p.Confirmado from presupuesto p left join cliente c on c.PkCliente = p.FkCliente where fechacreacion between ? and ? and Confirmado = ? order by p.PkPresupuesto;', [req.params.FechaDesde, req.params.FechaHasta, req.params.aceptado], (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "presup no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "presup no encontrado" });
            }
        });
    }

    public async getOne(req: Request, res: Response) {   
        pool.query('SELECT p.PkPresupuesto, p.FkCliente, concat(c.Nombre, " ", c.Apellido) "Nombre",c.Telefono, c.Mail, c.Apellido, p.FechaVigencia, p.FechaCreacion, p.Observacion, p.Confirmado from presupuesto p left join cliente c on c.PkCliente = p.FkCliente where PkPresupuesto=?;', req.params.PkPresupuesto, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "presup no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "presup no encontrado" });
            }
        });
    }

    public async delete(req: Request, res: Response) {
        const stringSQL = "call deletePresupuesto(?);";
        pool.query(stringSQL, [req.params.PkPresupuesto], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

    // public async procesar(req: Request, res: Response) {       
    //     const stringSQL = "call procesarPedido(?);";
    //     pool.query(stringSQL, [req.params.PkPedProv], function (err: any, results: any) {
    //         if (err) throw err;                  
    //         try {
    //             return res.json({ text: 'OK' });
    //         } catch (error) {
    //             return res.status(200).json({ exist: false });
    //         }
    //     });
    // }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        let presupuesto = {
            'FkCliente': req.body.FkCliente,
            'FechaCreacion': req.body.FechaCreacion,
            'FechaVigencia': req.body.FechaVigencia,
            'Observacion': req.body.Observacion,
            'Confirmado': '0',
        }
        //Registro la orden          
        await pool.query('INSERT INTO presupuesto SET ?', [presupuesto], function (err: any, resultInser: any) {
            if (err) throw err;
            const ultimo = resultInser.insertId;
            res.json({ message: ultimo });
        });
    }

    public async update(req: Request, res: Response) {
        let presupuesto = {
            'FkCliente': req.body.FkCliente,
            'FechaVigencia': req.body.FechaVigencia,
            'Observacion': req.body.Observacion,
            'Confirmado': req.body.Confirmado,
        }      
        await pool.query('update presupuesto set ? Where PkPresupuesto = ?', [presupuesto, req.params.PkPresupuesto], function (err: Error, res: Response) {
            if (err) throw err;
        });
        res.json({ text: 'OK' });
    }

    public async confirmar(req: Request, res: Response) {
     
        await pool.query('update presupuesto set Confirmado=1 Where PkPresupuesto = ?', [req.params.PkPresupuesto], function (err: Error, res: Response) {
            if (err) throw err;
        });
        res.json({ text: 'OK' });
    }
}

const presupuestosController = new PresupuestoController();
export default presupuestosController;