import { Request, Response } from 'express';
import pool from '../database';


import { Proveedor } from '../Models/proveedor'

class ProveedorController {
    
     public async getProveedores(req: Request, res: Response) {
        pool.query('Select p.PkProveedor, p.Nombre, p.Firma, p.Cuit, p.FkCiudad, p.Telefono, p.Mail, c.FkProvincia as "FkProv" from proveedor p left join ciudad c on c.PkCiudad=p.FkCiudad where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "proveedores no encontrado" });
            }
            if (results) {            
                return res.json(results);
            } else {
                return res.status(404).json({ text: "proveedores no encontrado" });
            }
        });
    }

    //funciona
    public async GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM proveedor WHERE PkProveedor = ?', req.params.PkProveedor, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "proveedores no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "proveedores no encontrado" });
            }
        });
    }
    public async getProveedoresFindByNombre(req: Request, res: Response) {
        pool.query("Select * FROM proveedor WHERE Nombre like '%" + req.params.Valor + "%' and Activo=1 order by nombre", (err: any, results: any) => {

            if (err) {
                res.status(404).json({ text: "proveedor no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "proveedor no encontrado" });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {       
        await pool.query('INSERT INTO proveedor set ?', [req.body]);        
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE proveedor set Activo = 0 WHERE PkProveedor = ?', req.params.PkCliente);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {
        let proveedor: Proveedor = {
            'PkProveedor': req.body.PkProveedor,
            'Nombre': req.body.Nombre,
            'Firma': req.body.Firma,
            'FkCiudad': req.body.FkCiudad,
            'Telefono': req.body.Telefono,
            'Mail': req.body.Mail,   
            'Cuit': req.body.Cuit,   
            'Activo': true 
        }       

        await pool.query('update proveedor set ? Where PkProveedor = ?', [proveedor, req.params.PkProveedor]);
        res.json({ text: 'OK' });
        // res.json({ text: 'actualizado cliente' + req.params.PkCliente });
    }
}


const proveedorController = new ProveedorController();
export default proveedorController;