"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class OrdenesRepController {
    //listado de ordenes para mostrar en el menu ordenes
    getOrdenes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, estado.nombre as "Estado" from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente inner join estado on estado.PkEstado = ordenreparacion.FkEstado order by FecRetiroEstimado', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    //obtener ultimo id ingresado de la orden
    getLastIdOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('select max(PkOrdenreparacion) as max from ordenreparacion', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    //obtener detalle de una orden 
    getDetalleEstadoOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT DescripProblema, FechaInicio, FecRetiroEstimado, Modelo.Nombre as "Modelo", Marca.Nombre as "Marca", Producto.Nombre as "Producto" ,Estado.Nombre as "Estado" FROM ordenreparacion  inner join Modelo on modelo.PkModelo=FkModelo inner join Marca on Marca.PkMarca=Modelo.FkMarca inner join Producto on Producto.PkProducto=Marca.FkProducto inner join Estado on estado.PkEstado=FkEstado where PkOrdenreparacion=?;', req.params.PkOrdenRep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    getOrdenesFindByEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let stringSQL = "";
            if (req.params.FkEstado != "T") {
                stringSQL = "Select Pkordenreparacion, c.Nombre Cliente, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado left join cliente c on c.PkCliente = OrR.FkCliente WHERE FkEstado = ? order by FecRetiroEstimado Desc";
            }
            else {
                stringSQL = "Select Pkordenreparacion, c.Nombre Cliente, FecRetiroEstimado, FkEstado, e.NOMBRE Estado from ordenreparacion OrR left join estado e on e.PKestado = OrR.FkEstado left join cliente c on c.PkCliente = OrR.FkCliente order by FecRetiroEstimado Desc";
            }
            database_1.default.query(stringSQL, req.params.FkEstado, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    getOrdenesFindByNro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE Pkordenreparacion = ? ', req.params.PkOrdenRep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    //Obtener ordenes segun estado o cliente
    getOrdenesFindByCliEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let FkEstado = parseInt(req.params.FkEstado);
            let FkCliente = parseInt(req.params.FkCliente);
            if (req.params.FkCliente > 0 && req.params.FkEstado > 0) {
                //En caso de que exista cliente y estado
                database_1.default.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE ordenreparacion.FkCliente = ? and ordenreparacion.FkEstado = ? ', [FkCliente, FkEstado], (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "OR no encontrado" });
                    }
                    if (results) {
                        return res.json(results);
                    }
                    else {
                        return res.status(404).json({ text: "OR no encontrado" });
                    }
                });
            }
            else if (req.params.FkCliente > 0) {
                //En caso de que exista cliente
                database_1.default.query('Select Pkordenreparacion, cliente.Nombre as "Cliente", FecRetiroEstimado, FkEstado from ordenreparacion inner join cliente on cliente.PkCliente = ordenreparacion.FkCliente WHERE ordenreparacion.FkCliente = ?; ', FkCliente, (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "OR no encontrado" });
                    }
                    if (results) {
                        return res.json(results);
                    }
                    else {
                        return res.status(404).json({ text: "OR no encontrado" });
                    }
                });
            }
        });
    }
    //funciona
    GetOne(req, res) {
        database_1.default.query('SELECT * FROM ordenreparacion WHERE PkOrdenreparacion = ?', req.params.PkOrdenRep, (err, results) => {
            if (err) {
                res.status(404).json({ text: "OR no encontrado" });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "OR no encontrado" });
            }
        });
    }
    //funciona
    GetOneForEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT cliente.Mail as "Mail", Estado.Nombre as "Estado", FecRetiroEstimado as "FechaRetiro" FROM ordenreparacion inner join Cliente on Cliente.PkCliente=ordenreparacion.FkCliente inner join Estado on Estado.PkEstado=ordenreparacion.FkEstado WHERE PkOrdenreparacion = ?', req.params.PkOrdenRep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "OR no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "OR no encontrado" });
                }
            });
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let ordenRep = {
                'FechaInicio': req.body.FechaInicio,
                'FecRetiroEstimado': req.body.FecRetiroEstimado,
                'DescripProblema': req.body.DescripProblema,
                'FkModelo': req.body.FkModelo,
                'FkCliente': req.body.FkCliente,
                'FkEstado': req.body.FkEstado,
                'FkUsuario': req.body.FkUsuario,
            };
            //Registro la orden          
            yield database_1.default.query('INSERT INTO ordenreparacion SET ?', [ordenRep], function (err, resultInserOrd) {
                if (err)
                    throw err;
                const ultimaOrden = resultInserOrd.insertId;
                res.json({ message: ultimaOrden });
            });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM ordenreparacion WHERE PkOrdenreparacion = ?', [req.params.PkOrdenRep]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let ordenRep = {
                'FechaInicio': req.body.FechaInicio,
                'FecRetiroEstimado': req.body.FecRetiroEstimado,
                'DescripProblema': req.body.DescripProblema,
                'FkModelo': req.body.FkModelo,
                'FkCliente': req.body.FkCliente,
                'FkEstado': req.body.FkEstado,
                'FkUsuario': req.body.FkUsuario,
            };
            console.log(ordenRep, req.params.PkOrdenRep);
            yield database_1.default.query('update ordenreparacion set ? Where PkOrdenreparacion = ?', [ordenRep, req.params.PkOrdenRep], function (err, res) {
                if (err)
                    throw err;
            });
            res.json({ text: 'OK' });
        });
    }
    //Actuliza unicamente el estado
    updateEstado(req, res) {
        // await pool.query('UPDATE ordenreparacion SET FkEstado = ? WHERE PkOrdenreparacion = ?;', [req.params.FkEstado, req.params.PkOrdenRep], function (err: Error, res: Response) {
        database_1.default.query('UPDATE ordenreparacion SET FkEstado = ? WHERE PkOrdenreparacion = ?;', [req.body.FkEstado, req.params.PkOrdenRep], function (err, resSql) {
            if (err) {
                return res.status(200).json({ exist: false });
            }
            ;
            return res.status(200).json({ exist: true });
        });
    }
    //Valida que la orden ingresada por el cliente sea valida
    ValidarOrden(req, res) {
        let datosOrden = {
            idOrden: req.body.PkOrdenRep,
            Mail: req.body.Mail,
            Contrasenia: req.body.Contrasenia,
        };
        console.log(datosOrden);
        database_1.default.query('Select oRe.PkOrdenreparacion from ordenreparacion oRe inner join cliente c on c.PkCliente=oRe.FkCliente where PkOrdenreparacion=? and c.Mail= ? and c.Contrasenia= ?;', [datosOrden.idOrden, datosOrden.Mail, datosOrden.Contrasenia], (err, ordenDb) => {
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
exports.default = ordenesreparacionController;
