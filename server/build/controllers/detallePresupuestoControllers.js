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
class DetallePresupuestoController {
    getFindByPresupuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('select dp.PkDetallePresup, dp.FkRepuesto, r.Nombre "Repuesto", dp.Observacion, dp.Cantidad, dp.Precio, ((dp.Precio*dp.Cantidad) + dp.Costo) "Total", dp.FkPresupuesto, dp.FkTarea, t.Nombre "Tarea", dp.Costo from detallepresupuesto dp left join tarea t on t.PkTarea=dp.FkTarea left join repuesto r on r.PkRepuesto=dp.FkRepuesto where dp.FkPresupuesto = ?', req.params.FkPresupuesto, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detallepresu no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detallepresu no encontrado" });
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let detallePresupuesto = {
                'FkRepuesto': req.body.FkRepuesto,
                'Precio': req.body.Precio,
                'Cantidad': req.body.Cantidad,
                'Observacion': req.body.Observacion,
                'FkPresupuesto': req.body.FkPresupuesto,
                'FkTarea': req.body.FkTarea,
                'Costo': req.body.Costo,
            };
            yield database_1.default.query('INSERT INTO detallepresupuesto set ?', [detallePresupuesto], function (err) {
                if (err)
                    throw err;
                res.json({ text: 'OK' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM detallepresupuesto WHERE PkDetallePresup = ?', [req.params.PkDetallePresup]);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        database_1.default.query('update detallepresupuesto set ? Where PkDetallePresup = ?', [req.body, req.body.PkDetallePresup]);
        res.json({ text: 'OK' });
    }
}
const detallePresupuestoController = new DetallePresupuestoController();
exports.default = detallePresupuestoController;
