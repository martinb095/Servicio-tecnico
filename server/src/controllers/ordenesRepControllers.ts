import { Request, Response, Router } from 'express';
import pool from '../database';


class OrdenesRepController {

    //listado de ordenes para mostrar en el menu ordenes
    public async getOrdenes(req: Request, res: Response) {
        pool.query('Select Pkordenreparacion, concat(c.Nombre, " ", c.Apellido) as "Cliente", FecRetiroEstimado, estado.nombre as "Estado" from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente inner join estado on estado.PkEstado = ordenreparacion.FkEstado order by FecRetiroEstimado', (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    //obtener ultimo id ingresado de la orden
    public async getLastIdOrden(req: Request, res: Response) {
        pool.query('select max(PkOrdenreparacion) as max from ordenreparacion', (err: any, results: any) => {
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

    //obtener detalle de una orden 
    public async getDetalleEstadoOrden(req: Request, res: Response) {
        pool.query('SELECT ore.FecRetiroEstimado, ore.DescripProblema, ore.Observacion, ore.FkModelo, mo.Nombre as "Modelo", mo.FkMarca, ma.Nombre "Marca", ore.FkCliente, c.Nombre, c.Telefono, c.Mail, ore.FkEstado, est.Nombre as "Estado", FechaInicio FROM ordenreparacion ore left join Modelo mo on mo.PkModelo=ore.FkModelo left join Marca ma on ma.PkMarca=mo.FkMarca left join Estado est on est.PkEstado=ore.FkEstado left join Cliente c on c.PkCliente=FkCliente where PkOrdenreparacion=?;', req.params.PkOrdenRep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    public async getOrdenesFindByEstado(req: Request, res: Response) {
        let stringSQL: string = "";
        if (req.params.FkEstado != "T") {
            stringSQL = "Select Pkordenreparacion, concat(c.Nombre, ' ', c.Apellido) Cliente, c.Telefono CliTel, FechaInicio, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado left join cliente c on c.PkCliente = OrR.FkCliente WHERE FkEstado = ? order by FecRetiroEstimado Desc";
        } else {
            stringSQL = "Select Pkordenreparacion, concat(c.Nombre, ' ', c.Apellido) Cliente, c.Telefono CliTel, FechaInicio, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado left join cliente c on c.PkCliente = OrR.FkCliente order by FecRetiroEstimado Desc";
        }
        pool.query(stringSQL, req.params.FkEstado, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    public async getOrdenesFindByNro(req: Request, res: Response) {
        pool.query('Select OrR.Pkordenreparacion, concat(c.Nombre, " ", c.Apellido) Cliente, FechaInicio, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado inner join cliente on cliente.PkCliente = OrR.FkCliente WHERE Pkordenreparacion = ? ', req.params.PkOrdenRep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                //return res.json(results[0]);
                return res.json(results);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    //Obtener ordenes segun estado o cliente
    public async getOrdenesFindByCliEstado(req: Request, res: Response) {

        let FkEstado = parseInt(req.params.FkEstado);
        let FkCliente = parseInt(req.params.FkCliente);
        if (req.params.FkCliente > 0 && req.params.FkEstado > 0) {
            //En caso de que exista cliente y estado
            pool.query('Select Pkordenreparacion, concat(c.Nombre, " ", c.Apellido) as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion ore inner join cliente c on c.PkCliente = ore.FkCliente WHERE ordenreparacion.FkCliente = ? and ordenreparacion.FkEstado = ? ', [FkCliente, FkEstado], (err: any, results: any) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    return res.json(results);
                } else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        } else if (req.params.FkCliente > 0) {
            //En caso de que exista cliente
            pool.query('Select Pkordenreparacion, concat(c.Nombre, " ", c.Apellido) as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE ordenreparacion.FkCliente = ?; ', FkCliente, (err: any, results: any) => {
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
    }

    //funciona
    public GetOne(req: Request, res: Response) {
        pool.query('SELECT * FROM ordenreparacion WHERE PkOrdenreparacion = ?', req.params.PkOrdenRep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    //funciona
    public async GetOneForEmail(req: Request, res: Response) {
        pool.query('SELECT c.Mail as "Mail", e.Nombre as "Estado", ord.FecRetiroEstimado as "FechaRetiro" FROM ordenreparacion ord left join Cliente c on c.PkCliente=ord.FkCliente left join Estado e on e.PkEstado=ord.FkEstado WHERE PkOrdenreparacion = ?', req.params.PkOrdenRep, (err: any, results: any) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            } else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }

    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    public async create(req: Request, res: Response) {
        let ordenRep = {
            'FechaInicio': req.body.FechaInicio,
            'FecRetiroEstimado': req.body.FecRetiroEstimado,
            'DescripProblema': req.body.DescripProblema,
            'FkModelo': req.body.FkModelo,
            'FkCliente': req.body.FkCliente,
            'FkEstado': req.body.FkEstado,
            'FkUsuario': req.body.FkUsuario,
            'Observacion': req.body.Observacion,
        }
        //Registro la orden          
        await pool.query('INSERT INTO ordenreparacion SET ?', [ordenRep], function (err: any, resultInserOrd: any) {
            if (err) throw err;
            const ultimaOrden = resultInserOrd.insertId;
            res.json({ message: ultimaOrden });
        });
    }

    //Para ver q nro esta eliminando 
    public async delete(req: Request, res: Response) {
        const stringSQL = "call eliminarOrden(?);";
        pool.query(stringSQL, [req.params.PkOrden], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }



    public async update(req: Request, res: Response) {
        let ordenRep = {
            'FechaInicio': req.body.FechaInicio,
            'FecRetiroEstimado': req.body.FecRetiroEstimado,
            'DescripProblema': req.body.DescripProblema,
            'FkModelo': req.body.FkModelo,
            'FkCliente': req.body.FkCliente,
            'FkEstado': req.body.FkEstado,
            'FkUsuario': req.body.FkUsuario,
            'Observacion': req.body.Observacion,
        }        
        await pool.query('update ordenreparacion set ? Where PkOrdenreparacion = ?', [ordenRep, req.params.PkOrdenRep], function (err: Error, res: Response) {
            if (err) throw err;
        });
        res.json({ text: 'OK' });
    }

    //Actuliza unicamente el estado
    public updateEstado(req: Request, res: Response) {       
        console.log([req.body.PkOrdenRep, req.body.FkEstado, req.body.Observacion]); 
        const stringSQL = "call actualizarEstadoOrden(?,?,?);";
        pool.query(stringSQL, [req.body.PkOrdenRep, req.body.FkEstado, req.body.Observacion], function (err: any, results: any) {
            if (err) throw err;
            try {
                return res.json({ text: 'OK' });
            } catch (error) {
                return res.status(200).json({ exist: false });
            }
        });
    }

    //Valida que la orden ingresada por el cliente sea valida
    public ValidarOrden(req: Request, res: Response) {
        let datosOrden = {
            idOrden: req.body.PkOrdenRep,
            Mail: req.body.Mail,
            Contrasenia: req.body.Contrasenia,
        };
        pool.query('Select oRe.PkOrdenreparacion from ordenreparacion oRe left join cliente c on c.PkCliente=oRe.FkCliente where PkOrdenreparacion=? and c.Mail= ? and c.Contrasenia= ?;', [datosOrden.idOrden, datosOrden.Mail, datosOrden.Contrasenia], (err: any, ordenDb: any[]) => {
            if (err) {
                res.status(404).json({ text: "Error" });
            }
            if (ordenDb.length == 0) {
                return res.status(200).json({ exist: false });
            }
            else {
                return res.status(200).json({ exist: true });
            }
        });
    }

}

const ordenesreparacionController = new OrdenesRepController();
export default ordenesreparacionController;