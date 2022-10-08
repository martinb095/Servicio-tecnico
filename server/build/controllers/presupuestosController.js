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
class PresupuestoController {
    getPresupuestos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT p.PkPresupuesto, p.FKCliente, c.Nombre, c.Apellido, p.FechaVigencia, p.FechaCreacion, p.Observacion, p.Confirmado from presupuesto p left join cliente c on c.PkCliente = p.FkCliente where fechacreacion between ? and ? order by p.PkPresupuesto;', [req.params.FechaDesde, req.params.FechaHasta], (err, results) => {
                if (err) {
                    res.status(404).json({ text: "presup no encontrado" });
                }
                if (results) {
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "presup no encontrado" });
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT p.PkPresupuesto, p.FKCliente, c.Nombre, c.Apellido, p.FechaVigencia, p.FechaCreacion, p.Observacion, p.Confirmado from presupuesto p left join cliente c on c.PkCliente = p.FkCliente where PkPresupuesto=?;', req.params.PkPresupuesto, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "presup no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "presup no encontrado" });
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringSQL = "call deletePresupuesto(?);";
            database_1.default.query(stringSQL, [req.params.PkPresupuesto], function (err, results) {
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
    // public async procesar(req: Request, res: Response) {       
    //     const stringSQL = "call procesarPedido(?);";
    //     pool.query(stringSQL, [req.params.PkPedProv], function (err: any, results: any) {
    //         if (err) throw err;                  
    //         try {
    //             return res.json({ text: 'OK' });
    //         } catch (error) {
    //             return res.status(200).json({ exist: false });
    //         }
    //     });
    // }
    //Await espera que se ejecute la consulta para continuar con la siguiente ya que se demora
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let presupuesto = {
                'FkCliente': req.body.FkCliente,
                'FechaCreacion': req.body.FechaCreacion,
                'FechaVigencia': req.body.FechaVigencia,
                'Observacion': req.body.Observacion,
                'Confirmado': '0',
            };
            //Registro la orden          
            yield database_1.default.query('INSERT INTO presupuesto SET ?', [presupuesto], function (err, resultInser) {
                if (err)
                    throw err;
                const ultimo = resultInser.insertId;
                res.json({ message: ultimo });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let presupuesto = {
                'FkCliente': req.body.FkCliente,
                'FechaVigencia': req.body.FechaVigencia,
                'Observacion': req.body.Observacion,
                'Confirmado': req.body.Confirmado,
            };
            yield database_1.default.query('update presupuesto set ? Where PkPresupuesto = ?', [presupuesto, req.params.PkPresupuesto], function (err, res) {
                if (err)
                    throw err;
            });
            res.json({ text: 'OK' });
        });
    }
}
const presupuestosController = new PresupuestoController();
exports.default = presupuestosController;
