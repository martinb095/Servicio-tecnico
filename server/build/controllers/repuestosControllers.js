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
class RepuestoController {
    getRepuestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.FkTipoRepuesto > 0) {
                database_1.default.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.Imagen FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 and r.FkTipoRepuesto = ? order by nombre', req.params.FkTipoRepuesto, (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "repuesto no encontrado" });
                    }
                    if (results) {
                        return res.json(results);
                    }
                    else {
                        return res.status(404).json({ text: "repuesto no encontrado" });
                    }
                });
            }
            else {
                database_1.default.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.Imagen FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 order by nombre', (err, results) => {
                    if (err) {
                        res.status(404).json({ text: "repuesto no encontrado" });
                    }
                    if (results) {
                        return res.json(results);
                    }
                    else {
                        return res.status(404).json({ text: "repuesto no encontrado" });
                    }
                });
            }
        });
    }
    getRepuestosFindByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.FkTipoRepuesto, r.Observacion, r.NroSerie, tr.Nombre as 'TipoRepuesto', m.Nombre as 'Marca', r.Imagen FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Nombre like '%" + req.params.Valor + "%' and r.Activo = 1 order by r.nombre", (err, results) => {
                if (err) {
                    res.status(404).json({ text: "repuesto no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "repuesto no encontrado" });
                }
            });
        });
    }
    GetOne(req, res) {
        database_1.default.query('SELECT * FROM repuesto WHERE PkRepuesto = ?', req.params.PkMarca, (err, results) => {
            if (err) {
                res.status(404).json({ text: "repuesto no encontrada." });
            }
            if (results) {
                return res.json(results[0]);
            }
            else {
                return res.status(404).json({ text: "repuesto no encontrada." });
            }
        });
    }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    // public async create(req: Request, res: Response) {
    //     console.log([req.body],"aaaaaaaa")        
    //     await pool.query('INSERT INTO repuesto set ?', [req.body]);    
    // }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let repuesto = {
            //     'Nombre': req.body.Nombre,
            //     'PrecioCosto': req.body.PrecioCosto,
            //     'PrecioVenta': req.body.PrecioVenta,
            //     'CantidadStock': req.body.CantidadStock,
            //     'Observacion': req.body.Observacion,
            //     'NroSerie': req.body.NroSerie,
            //     'FkTipoRepuesto': req.body.FkTipoRepuesto,
            // }
            // console.log([repuesto]);
            yield database_1.default.query('INSERT INTO repuesto set ?', [req.body], function (err, resultInserOrd) {
                if (err)
                    throw err;
                const ultimoRep = resultInserOrd.insertId;
                res.json({ text: 'OK' });
            });
            // await pool.query('INSERT INTO repuesto set ?', [req.body]);   
            // const ultimoRep = res.insertId; 
            // return ultimoRep;
            // res.json({ message: 'repeusto guardado' });
        });
    }
    //Para ver q nro esta eliminando
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE repuesto set Activo = 0 WHERE PkRepuesto = ?', req.params.PkRepuesto);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let repuesto = {
                'PkRepuesto': req.body.PkRepuesto,
                'Nombre': req.body.Nombre,
                'PrecioCosto': req.body.PrecioCosto,
                'PrecioVenta': req.body.PrecioVenta,
                'Observacion': req.body.Observacion,
                'CantidadStock': req.body.CantidadStock,
                'FkTipoRepuesto': req.body.FkTipoRepuesto,
                'FkMarca': req.body.FkMarca,
                'NroSerie': req.body.NroSerie,
                'Activo': true
            };
            yield database_1.default.query('update repuesto set ? Where PkRepuesto = ?', [repuesto, req.params.PkRepuesto]);
            res.json({ text: 'OK' });
        });
    }
    getRepuestosSinAsignar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const PkOrdenRep = [req.params.PkOrdenRep];
            database_1.default.query('Select * from repuesto where CantidadStock>0 and not exists (select 1 from detallerepuesto where detallerepuesto.FkRepuesto = repuesto.PkRepuesto and detallerepuesto.FkOrdenRep= ? and repuesto.Activo=1) order by nombre;', PkOrdenRep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "repuesto no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "repuesto no encontrado" });
                }
            });
        });
    }
}
const repuestoController = new RepuestoController();
exports.default = repuestoController;
