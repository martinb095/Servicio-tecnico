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
class RepuestoHistController {
    getRepuestosFindByRepuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("SELECT Fecha, FkRepuesto, Precio FROM repuestohist WHERE FkRepuesto =" + req.params.PkRepuesto + " order by Fecha", (err, results) => {
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
const repuestoHistController = new RepuestoHistController();
exports.default = repuestoHistController;
