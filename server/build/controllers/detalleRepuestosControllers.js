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
class DetalleRepuestoController {
    //listado de detallerepuestos
    getDetalleRepuestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select * from detallerepuesto', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detallerepuestos no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detallerepuestos no encontrado" });
                }
            });
        });
    }
    getFindByOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fkOrden = [req.params.FkOrdenRep];
            database_1.default.query('Select * from detallerepuesto where FkOrdenRep = ?', fkOrden, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detallerepuestos no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detallerepuestos no encontrado" });
                }
            });
        });
    }
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM detallerepuesto WHERE PkDetallerepuesto = ?', req.params.PkDetalleRepuesto, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detallerepuesto no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "detallerepuesto no encontrado" });
                }
            });
        });
    }
    //funciona
    GetDetallesFindByOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select repuesto.Nombre,Cantidad,Precio from detallerepuesto inner join repuesto on repuesto.PkRepuesto=detallerepuesto.FkRepuesto where FkOrdenRep= ?', req.params.FkOrdenrep, (err, results) => {
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
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    createServ(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let detalleRep = {
                'Cantidad': item.Cantidad,
                'FkRepuesto': item.FkRepuesto,
                'Precio': item.Precio,
                'FkOrdenrep': item.FkOrdenrep,
            };
            yield database_1.default.query('INSERT INTO detallerepuesto set ?', [detalleRep]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, "req.body");
            let detalleRep = {
                'Cantidad': req.body.Cantidad,
                'FkRepuesto': req.body.FkRepuesto,
                'FkOrdenRep': req.body.FkOrdenrep,
                'Precio': req.body.Precio,
            };
            yield database_1.default.query('INSERT INTO detallerepuesto set ?', [detalleRep], function (err) {
                if (err)
                    throw err;
            });
        });
    }
    //Para ver q nro esta eliminando
    delete(fkordenrep) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM detallerepuesto WHERE FkOrdenRep = ?', fkordenrep);
            //  res.json({ text: 'eliminando detallerepuesto' + req.params.PkDetalleRepuesto });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update detallerepuesto set ? Where PkDetalleRepuesto = ?', [req.body, id]);
            res.json({ text: 'OK' });
            //res.json({ text: 'actualizado detallerepuesto' + req.params.PkDetalleRepuesto });
        });
    }
}
const detallerepuestosController = new DetalleRepuestoController();
exports.default = detallerepuestosController;
