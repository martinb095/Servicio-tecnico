import { Request, Response, Router } from 'express';
import pool from '../database';
import { any } from 'bluebird';


import express = require('express');
import usuariosController from './usuariosControllers';
//repuestos
import { DetalleRepuesto } from '../Models/detallerepuesto';
import detalleRepuestosControllers from '../controllers/detalleRepuestosControllers';

//tareas
import detalleTareasController from '../controllers/detalleTareasControllers';
import { DetalleTarea } from '../Models/detalletarea';


class OrdenesRepController {

    //listado de ordenes para mostrar en el menu ordenes
    public async getOrdenes(req: Request, res: Response) {
        pool.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, estado.nombre as "Estado" from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente inner join estado on estado.PkEstado = ordenreparacion.FkEstado order by FecRetiroEstimado', (err: any, results: any) => {
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
        pool.query('SELECT DescripProblema, FechaInicio, FecRetiroEstimado, Modelo.Nombre as "Modelo", Marca.Nombre as "Marca", Producto.Nombre as "Producto" ,Estado.Nombre as "Estado" FROM ordenreparacion  inner join Modelo on modelo.PkModelo=FkModelo inner join Marca on Marca.PkMarca=Modelo.FkMarca inner join Producto on Producto.PkProducto=Marca.FkProducto inner join Estado on estado.PkEstado=FkEstado where PkOrdenreparacion=?;', req.params.PkOrdenRep, (err: any, results: any) => {
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
            stringSQL = "Select Pkordenreparacion, c.Nombre Cliente, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado left join cliente c on c.PkCliente = OrR.FkCliente WHERE FkEstado = ? order by FecRetiroEstimado Desc";
        } else {
            stringSQL = "Select Pkordenreparacion, c.Nombre Cliente, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado left join cliente c on c.PkCliente = OrR.FkCliente order by FecRetiroEstimado Desc";
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
        pool.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE Pkordenreparacion = ? ', req.params.PkOrdenRep, (err: any, results: any) => {
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
            pool.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE ordenreparacion.FkCliente = ? and ordenreparacion.FkEstado = ? ', [FkCliente, FkEstado], (err: any, results: any) => {

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
            pool.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE ordenreparacion.FkCliente = ?; ', FkCliente, (err: any, results: any) => {
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
        pool.query('SELECT cliente.Mail as "Mail", Estado.Nombre as "Estado", FecRetiroEstimado as "FechaRetiro" FROM ordenreparacion inner join Cliente on Cliente.PkCliente=ordenreparacion.FkCliente inner join Estado on Estado.PkEstado=ordenreparacion.FkEstado WHERE PkOrdenreparacion = ?', req.params.PkOrdenRep, (err: any, results: any) => {
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
        }

        let tareas = req.body.detalleTareas;
        let repuestos = req.body.detalleRepuestos;


        //Registro la orden    
        //    await pool.query('INSERT INTO ordenreparacion set ?', [ordenRep] );
        await pool.query('INSERT INTO ordenreparacion SET ?', [ordenRep], function (err: any, resultInserOrd: any) {
            if (err) throw err;
            const ultimaOrden = resultInserOrd.insertId;
            res.json({ message: 'OR guardado' });

            //recorre repuesto y guarda
            repuestos.forEach(function (item: DetalleRepuesto) {
                //Asignar valores a detalle para guardar          
                item.FkOrdenrep = ultimaOrden;
                //Guarda detalle
                detalleRepuestosControllers.createServ(item);
            });

            //recorre tarea y guarda
            tareas.forEach(function (item: DetalleTarea) {
                //Asignar valores a detalle para guardar 
                item.FkOrdenRep = ultimaOrden;
                console.log(item, "item");
                //Guarda detalle
                detalleTareasController.createServ(item);
            });
        });

    }

    //Para ver q nro esta eliminando
    public async delete(req: Request, res: Response) {
        await pool.query('DELETE FROM ordenreparacion WHERE PkOrdenreparacion = ?', [req.params.PkOrdenRep]);
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
        }
        console.log(ordenRep, req.params.PkOrdenRep);
        await pool.query('update ordenreparacion set ? Where PkOrdenreparacion = ?', [ordenRep, req.params.PkOrdenRep], function (err: Error, res: Response) {
            if (err) throw err;
        });

        //elimina los detalles
        detalleTareasController.delete(req.params.PkOrdenRep);
        detalleRepuestosControllers.delete(req.params.PkOrdenRep);

        //insertar los detalles
        let tareas = req.body.detalleTareas;
        console.log(tareas, "tareas");
        //recorre tarea y guarda
        tareas.forEach(function (item: DetalleTarea) {
            //Guarda detalle
            detalleTareasController.createServ(item);
        });
        res.json({ text: 'OK' });
    }

    //Actuliza unicamente el estado
    public updateEstado(req: Request, res: Response) {
        // await pool.query('UPDATE ordenreparacion SET FkEstado = ? WHERE PkOrdenreparacion = ?;', [req.params.FkEstado, req.params.PkOrdenRep], function (err: Error, res: Response) {
        pool.query('UPDATE ordenreparacion SET FkEstado = ? WHERE PkOrdenreparacion = ?;', [req.body.FkEstado, req.params.PkOrdenRep], function (err: Error, resSql: Response) {

            if (err) {
                return res.status(200).json({ exist: false });
            };
            return res.status(200).json({ exist: true });
        });
    }

    //Valida que la orden ingresada por el cliente sea valida
    public ValidarOrden(req: Request, res: Response) {
        let datosOrden = {
            idOrden: req.body.PkOrdenRep,
            Mail: req.body.Mail,
            Contrasenia: req.body.Contrasenia,
        };
        console.log(datosOrden);
        pool.query('Select oRe.PkOrdenreparacion from ordenreparacion oRe inner join cliente c on c.PkCliente=oRe.FkCliente where PkOrdenreparacion=? and c.Mail= ? and c.Contrasenia= ?;', [datosOrden.idOrden, datosOrden.Mail, datosOrden.Contrasenia], (err: any, ordenDb: any[]) => {
            if (err) {
                res.status(404).json({ text: "Error" });
            }
            console.log(ordenDb);
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