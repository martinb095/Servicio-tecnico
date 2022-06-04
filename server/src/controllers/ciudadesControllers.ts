import { Request, Response } from 'express';
import pool from '../database';

// import { Cliente } from '../Models/cliente';

class CiudadController {

    //EN los delete cambiar a update activo

    //listado de provincia
    public async GetProvincias(req: Request, res: Response) {
        pool.query('Select * from provincia', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "provincia no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "provincia no encontrado" });
            }
        });
    }

    //listado de ciudades por provincia
    public async GetCiudadesFindByProv(req: Request, res: Response) {
        pool.query('Select * from ciudad where FkProvincia= ?',req.params.PkProvincia, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "ciudad no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "ciudad no encontrado" });
            }
        });
    }

    //obtener de ciudades por provincia
    public async GetCiudadesFindByCod(req: Request, res: Response) {
        pool.query('Select * from ciudad where PkCiudad= ?',req.params.PkCiudad, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "ciudad no encontrado" });
            }
            if (results) {
                return res.json(results);
            } else {
                return res.status(404).json({ text: "ciudad no encontrado" });
            }
        });
    }

}

const ciudadController = new CiudadController();
export default ciudadController;