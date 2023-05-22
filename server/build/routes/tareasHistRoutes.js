"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareasHistControllers_1 = __importDefault(require("../controllers/tareasHistControllers"));
class TareasHistRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:PkTarea', tareasHistControllers_1.default.getTareasFindByTarea);
    }
}
const tareasHistRoutes = new TareasHistRoutes();
exports.default = tareasHistRoutes.router;
