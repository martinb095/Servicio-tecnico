import { Request, Response } from 'express';
import pool from '../database';


class ExcelController {

    public async getProveedores(req: Request, res: Response) {
        pool.query('Select p.PkProveedor "ID", p.Nombre, p.Firma, p.Cuit, p.Calle, p.Numero, p.Depto, p.Piso, c.Nombre "Ciudad", prov.Nombre as "Provincia", p.Telefono, p.Mail, p.Contacto1, p.Contacto2 from proveedor p left join ciudad c on c.PkCiudad=p.FkCiudad  left join provincia prov on prov.PkProvincia = c.FkProvincia where Activo=1 order by nombre', (err: any, results: any) => {
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

    public async getClientes(req: Request, res: Response) {
        pool.query('Select c.PkCliente "ID", c.Nombre, c.Telefono, c.FkCiudad, c.Calle, c.Numero, c.Depto, c.Piso, c.Mail, c.Contrasenia, ciu.Nombre "Ciudad", prov.Nombre as "Provincia", c.Apellido from cliente c left join ciudad ciu on ciu.PkCiudad=c.FkCiudad  left join provincia prov on prov.PkProvincia = ciu.FkProvincia where Activo=1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "clientes no encontrado" });
            }
            if (results) {            
                return res.json(results);
            } else {
                return res.status(404).json({ text: "clientes no encontrado" });
            }
        });
    }
  
    public async getUsuarios(req: Request, res: Response) {
        pool.query('SELECT us.PkUsuario "ID", us.Nombre, us.Contrasenia, tu.TipoUsuario "Tipo", us.UltimoIngreso, us.Mail FROM usuario us left join tipousuario tu on tu.PkTipoUsuario =  us.FkTipoUsuario where us.Activo = 1 order by nombre', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "clientes no encontrado" });
            }
            if (results) {            
                return res.json(results);
            } else {
                return res.status(404).json({ text: "clientes no encontrado" });
            }
        });
    }


}

const excelController = new ExcelController();
export default excelController;