import { Request, Response } from 'express';
import pool from '../database';


class PedidoController {
   
    public async getPedidos(req: Request, res: Response) {       
        pool.query('Select p.PkPedProv, p.FkProveedor, prov.Firma, p.FechaCreacion, p.Observacion from Pedido p left join proveedor prov on prov.PkProveedor=p.FkProveedor where fechacreacion between ? and ? order by p.PkPedProv;',[req.params.FechaDesde, req.params.FechaHasta], (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "pedidos no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "pedidos no encontrado" });
            }
        });
    }

    public async getOne(req: Request, res: Response) {       
        pool.query('Select p.FkProveedor, prov.Firma, prov.Telefono, prov.Mail, p.FechaCreacion, p.Observacion from pedido p left join Proveedor prov on p.FkProveedor = prov.PkProveedor where PkPedProv=?;', req.params.PkPedProv, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "pedido no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "pedido no encontrado" });
            }
        });
    }

    public async delete(req: Request, res: Response) {       
        const stringSQL = "call deletePedido(?);";
        pool.query(stringSQL, [req.params.PkPedProv], function (err: any, results: any) {
            if (err) throw err;                  
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

    public async procesar(req: Request, res: Response) {       
        const stringSQL = "call procesarPedido(?);";
        pool.query(stringSQL, [req.params.PkPedProv], function (err: any, results: any) {
            if (err) throw err;                  
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

      //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
      public async create(req: Request, res: Response) {
        let pedido = {
            'FkProveedor': req.body.FkProveedor,
            'FechaCreacion': req.body.FechaCreacion,
            'Observacion': req.body.Observacion,           
        }
        //Registro la orden          
        await pool.query('INSERT INTO pedido SET ?', [pedido], function (err: any, resultInser: any) {
            if (err) throw err;
            const ultimo = resultInser.insertId;
            res.json({ message: ultimo });
        });
    }

    public async update(req: Request, res: Response) {
        console.log(req.body.Observacion)
        let pedido = {           
            'Observacion': req.body.Observacion,        
        }        
        await pool.query('update pedido set ? Where PkPedProv = ?', [pedido, req.params.PkPedProv], function (err: Error, res: Response) {
            if (err) throw err;
        });
        res.json({ text: 'OK' });
    }
}

const pedidosController = new PedidoController();
export default pedidosController;