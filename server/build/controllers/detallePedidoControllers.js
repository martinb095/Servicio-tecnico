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
class DetallePedidoController {
    getFindByPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const FkPedProv = [req.params.FkPedProv];     
            //console.log(FkPedProv);
            database_1.default.query('Select dp.PkDetallePedido, dp.FkRepuesto, r.Nombre "Repuesto", dp.Observacion, dp.Cantidad from detallepedido dp left join Repuesto r on r.PkRepuesto=dp.FkRepuesto where FkPedProv = ?', req.params.FkPedProv, (err, results) => {
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let detallePedido = {
                'FkPedProv': req.body.FkPedProv,
                'FkRepuesto': req.body.FkRepuesto,
                'Cantidad': req.body.Cantidad,
                'Observacion': req.body.Observacion,
            };
            yield database_1.default.query('INSERT INTO detallepedido set ?', [detallePedido], function (err) {
                if (err)
                    throw err;
                res.json({ text: 'OK' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM detallepedido WHERE PkDetallePedido = ?', [req.params.PkDetallePedido]);
            res.json({ text: 'OK' });
        });
    }
    update(req, res) {
        console.log("req.body");
        console.log(req.body);
        database_1.default.query('update detallepedido set ? Where PkDetallePedido = ?', [req.body, req.body.PkDetallePedido]);
        res.json({ text: 'OK' });
    }
}
const detallepedidoController = new DetallePedidoController();
exports.default = detallepedidoController;
