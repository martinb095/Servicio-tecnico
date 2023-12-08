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
                database_1.default.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 and r.FkTipoRepuesto = ? order by nombre', req.params.FkTipoRepuesto, (err, results) => {
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
                database_1.default.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Activo = 1 order by nombre', (err, results) => {
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
    getRepuestosCompleto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.FkTipoRepuesto > 0) {
                database_1.default.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where r.Activo = 1 and r.FkTipoRepuesto = ? order by nombre', req.params.FkTipoRepuesto, (err, results) => {
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
                database_1.default.query('SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.Observacion, r.NroSerie,  r.FkTipoRepuesto, tr.Nombre as "TipoRepuesto", r.FkMarca, m.Nombre as "Marca", r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where r.Activo = 1 order by nombre', (err, results) => {
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
            database_1.default.query("SELECT r.PkRepuesto, r.Nombre, r.PrecioCosto, r.PrecioVenta, r.CantidadStock, r.FkTipoRepuesto, r.Observacion, r.NroSerie, tr.Nombre as 'TipoRepuesto', m.Nombre as 'Marca', r.FechaActualizacion FROM repuesto r left join tiporepuesto tr on tr.PkTipoRepuesto=r.FkTipoRepuesto left join marca m on m.PkMarca=r.FkMarca where CantidadStock > 0 and r.Nombre like '%" + req.params.Valor + "%' and r.Activo = 1 order by r.nombre", (err, results) => {
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
        database_1.default.query('SELECT * FROM repuesto WHERE PkRepuesto = ? and CantidadStock > 0 and Activo = 1', req.params.PkRepuesto, (err, results) => {
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call insertRepuesto(?,?,?,?,?,?,?,?);";
            database_1.default.query(stringSQL, [req.body.Nombre, req.body.PrecioCosto, req.body.PrecioVenta, req.body.Observacion, req.body.CantidadStock, req.body.FkTipoRepuesto, req.body.FkMarca, req.body.NroSerie], function (err, results) {
                if (err)
                    throw err;
                try {
                    return res.json({ text: 'OK' });
                }
                catch (error) {
                    return res.status(200).json({ exist: false });
                }
            });
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
            const stringSQL = "call actualizarRepuesto(?,?,?,?,?,?,?,?,?);";
            database_1.default.query(stringSQL, [req.body.PkRepuesto, req.body.Nombre, req.body.PrecioCosto, req.body.PrecioVenta, req.body.Observacion, req.body.CantidadStock, req.body.FkTipoRepuesto, req.body.FkMarca, req.body.NroSerie], function (err, results) {
                if (err)
                    throw err;
                try {
                    return res.json({ text: 'OK' });
                }
                catch (error) {
                    return res.status(200).json({ exist: false });
                }
            });
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
