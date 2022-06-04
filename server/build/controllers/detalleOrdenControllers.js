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
class DetalleOrdenController {
    getDetalleOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select * from detalleorden', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detalleorden no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detalleorden no encontrado" });
                }
            });
        });
    }
    getFindByOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fkOrden = [req.params.FkOrdenRep];
            // pool.query('Select * from detalletarea where FkOrdenRep = ?', req.params.FkOrdenrep, (err: any, results: any) => {
            database_1.default.query('Select deo.PkDetalleOrden, deo.Cantidad, deo.FkRepuesto, r.Nombre "NombreRep", deo.Precio, deo.Observacion, deo.FkTarea, t.Nombre "NombreTarea", (deo.Precio*deo.Cantidad) as "Total" from detalleorden  deo  left join repuesto r on r.PkRepuesto = deo.FkRepuesto left join tarea t on t.PkTarea = deo.FkTarea where FkOrden = ?', fkOrden, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detalleorden no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detalleorden no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM detalleorden WHERE PkDetalleOrden = ?', req.params.PkDetalleOrden, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detalleorden no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "detalleorden no encontrado" });
                }
            });
        });
    }
    //funciona
    GetDetallesFindByOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select deo.PkDetalleOrden, deo.Cantidad, deo.FkRepuesto, r.Nombre as "Repuesto", deo.Precio, deo.Observacion, deo.FkTarea, t.Nombre as "Tarea", FechaCreacion from detalleorden deo  left join repuesto r on r.PkRepuesto = deo.FkRepuesto left join tarea t on t.PkTarea = deo.FkTarea where FkOrden= ?', req.params.FkOrdenrep, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detallerepuestos no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detallerepuestos no encontrado" });
                }
            });
        });
    }
    //PAra crear desde el servidor
    createServ(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let detalleOrden = {
                'Cantidad': item.Cantidad,
                'FkRepuesto': item.FkRepuesto,
                'Precio': item.Precio,
                'Observacion': item.Observacion,
                'Fktarea': item.Fktarea,
                'FechaCreacion': item.FechaCreacion,
                'FkOrden': item.FkOrden,
            };
            yield database_1.default.query('INSERT INTO detalleorden set ?', [detalleOrden]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let detalleOrden = {
                'Cantidad': req.body.Cantidad,
                'FkRepuesto': req.body.FkRepuesto,
                'Precio': req.body.Precio,
                'Observacion': req.body.Observacion,
                'FkTarea': req.body.FkTarea,
                'FechaCreacion': req.body.FechaCreacion,
                'FkOrden': req.body.FkOrden,
            };
            yield database_1.default.query('INSERT INTO detalleorden set ?', [detalleOrden], function (err) {
                if (err)
                    throw err;
            });
        });
    }
    delete(fkordenrep) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(fkordenrep, "fkordenrep");
            yield database_1.default.query('DELETE FROM detalleorden WHERE FkOrden = ?', fkordenrep);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update detalleorden set ? Where PkDetalleOrden = ?', [req.body, id]);
            res.json({ text: 'OK' });
        });
    }
}
const detalleordenController = new DetalleOrdenController();
exports.default = detalleordenController;
