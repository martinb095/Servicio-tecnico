import { Request, Response } from 'express';
import pool from '../database';

import { Cliente } from '../Models/cliente'

class ClienteController {
   
    //listado de clientes
    public async getClientes(req: Request, res: Response) {
        //pool.query('Select * from cliente where Activo=1', (err: any, results: any) => {
        pool.query('Select c.PkCliente, c.Nombre, c.Telefono, c.FkCiudad, c.Calle, c.Numero, c.Depto, c.Piso, c.Mail, c.Contrasenia, ciu.FkProvincia as "FkProv", c.Apellido from cliente c left join ciudad ciu on ciu.PkCiudad=c.FkCiudad where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "clientes no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "clientes no encontrado" });
            }
        });
    }

    //funciona
    public async GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM cliente WHERE PkCliente = ?', req.params.PkCliente, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "clientes no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "clientes no encontrado" });
            }
        });
    }
    public async getClientesFindByNombre(req: Request, res: Response) {
        pool.query("Select * FROM cliente WHERE Nombre like '%" + req.params.Valor + "%' and Activo=1 order by nombre", (err: any, results: any) => {

            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {       
        await pool.query('INSERT INTO cliente set ?', [req.body]);        
        res.json({ text: 'OK' });
    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('UPDATE cliente set Activo = 0 WHERE PkCliente = ?', req.params.PkCliente);
        res.json({ text: 'OK' });
    }

    public async update(req: Request, res: Response) {
        let cliente: Cliente = {
            'PkCliente': req.body.PkCliente,
            'Nombre': req.body.Nombre,
            'Apellido': req.body.Apellido,
            'Telefono': req.body.Telefono,
            'FkCiudad': req.body.FkCiudad,
            'Calle': req.body.Calle,        
            'Numero': req.body.Numero,         
            'Piso': req.body.Piso,         
            'Depto': req.body.Calle,       
            'Mail': req.body.Mail,      
            'Contrasenia': req.body.Contrasenia,           
            'Activo': true
        }       

        await pool.query('update cliente set ? Where PkCliente = ?', [cliente, req.params.PkCliente]);
        res.json({ text: 'OK' });
        // res.json({ text: 'actualizado cliente' + req.params.PkCliente });
    }
}

const clientesController = new ClienteController();
export default clientesController;