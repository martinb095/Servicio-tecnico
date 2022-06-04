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
class DetalleTareaController {
    //listado de detalletareas
    getDetalleTareas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select * from detalletarea', (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detalletareas no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detalletareas no encontrado" });
                }
            });
        });
    }
    getFindByOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fkOrden = [req.params.FkOrdenRep];
            // pool.query('Select * from detalletarea where FkOrdenRep = ?', req.params.FkOrdenrep, (err: any, results: any) => {
            database_1.default.query('Select * from detalletarea where FkOrdenRep = ?', fkOrden, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detalletarea no encontrado" });
                }
                if (results) {
                    //return res.json(results[0]);                
                    return res.json(results);
                }
                else {
                    return res.status(404).json({ text: "detalletarea no encontrado" });
                }
            });
        });
    }
    //funciona
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('SELECT * FROM detalletarea WHERE PkDetalleTarea = ?', req.params.PkDetalleTarea, (err, results) => {
                if (err) {
                    res.status(404).json({ text: "detalletareas no encontrado" });
                }
                if (results) {
                    return res.json(results[0]);
                }
                else {
                    return res.status(404).json({ text: "detalletareas no encontrado" });
                }
            });
        });
    }
    //funciona
    GetDetallesFindByOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query('Select tarea.Nombre, detalletarea.Costo from detalletarea inner join tarea on tarea.PkTarea=detalletarea.FkTarea where FkOrdenRep= ?', req.params.FkOrdenrep, (err, results) => {
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
            let detalleTarea = {
                'FkTarea': item.FkTarea,
                'Costo': item.Costo,
                'FkOrdenrep': item.FkOrdenRep,
            };
            yield database_1.default.query('INSERT INTO detalletarea set ?', [detalleTarea]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let detalleTarea = {
                'FkTarea': req.body.FkTarea,
                'Costo': req.body.Costo,
                'FkOrdenRep': req.body.FkOrdenrep,
            };
            yield database_1.default.query('INSERT INTO detalletarea set ?', [detalleTarea], function (err) {
                if (err)
                    throw err;
            });
        });
    }
    delete(fkordenrep) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(fkordenrep, "fkordenrep");
            yield database_1.default.query('DELETE FROM detalletarea WHERE FkOrdenRep = ?', fkordenrep);
            // res.json({ text: 'eliminando detalletarea' + req.params.FkOrdenRep });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update detalletarea set ? Where PkDetalleTarea = ?', [req.body, id]);
            res.json({ text: 'OK' });
        });
    }
}
const detalletareasController = new DetalleTareaController();
exports.default = detalletareasController;
