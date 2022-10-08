"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const marcasRoutes_1 = __importDefault(require("./routes/marcasRoutes"));
const ordenesReparacionRoutes_1 = __importDefault(require("./routes/ordenesReparacionRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const modelosRoutes_1 = __importDefault(require("./routes/modelosRoutes"));
const tareasRoutes_1 = __importDefault(require("./routes/tareasRoutes"));
const estadosRoutes_1 = __importDefault(require("./routes/estadosRoutes"));
const repuestosRoutes_1 = __importDefault(require("./routes/repuestosRoutes"));
const detalleordenRoutes_1 = __importDefault(require("./routes/detalleordenRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const tipoRepuesRoutes_1 = __importDefault(require("./routes/tipoRepuesRoutes"));
const mailRoutes_1 = __importDefault(require("./routes/mailRoutes"));
const ciudadRoutes_1 = __importDefault(require("./routes/ciudadRoutes"));
const proveedorRoutes_1 = __importDefault(require("./routes/proveedorRoutes"));
const pedidosRoutes_1 = __importDefault(require("./routes/pedidosRoutes"));
const detallepedidoRoutes_1 = __importDefault(require("./routes/detallepedidoRoutes"));
const informesRoutes_1 = __importDefault(require("./routes/informesRoutes"));
const rubrosRoutes_1 = __importDefault(require("./routes/rubrosRoutes"));
const presupuestosRoutes_1 = __importDefault(require("./routes/presupuestosRoutes"));
const detallepresupuesto_1 = __importDefault(require("./routes/detallepresupuesto"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.app.disable('etag');
        this.config();
        this.routes();
    }
    config() {
        this.app.disable('etag');
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.disable('etag');
        this.app.use(indexRoutes_1.default);
        this.app.use('/clientes/', clientesRoutes_1.default);
        this.app.use('/ordenesreparacion/', ordenesReparacionRoutes_1.default);
        this.app.use('/marcas/', marcasRoutes_1.default);
        this.app.use('/productos/', productosRoutes_1.default);
        this.app.use('/modelos/', modelosRoutes_1.default);
        this.app.use('/estados/', estadosRoutes_1.default);
        this.app.use('/tareas/', tareasRoutes_1.default);
        this.app.use('/repuestos/', repuestosRoutes_1.default);
        this.app.use('/detalleorden/', detalleordenRoutes_1.default);
        this.app.use('/usuarios/', usuariosRoutes_1.default);
        this.app.use('/login/', loginRoutes_1.default);
        this.app.use('/tiporepuestos/', tipoRepuesRoutes_1.default);
        this.app.use('/mail/', mailRoutes_1.default);
        this.app.use('/ciudades/', ciudadRoutes_1.default);
        this.app.use('/proveedores/', proveedorRoutes_1.default);
        this.app.use('/pedidos/', pedidosRoutes_1.default);
        this.app.use('/detallepedido/', detallepedidoRoutes_1.default);
        this.app.use('/informes/', informesRoutes_1.default);
        this.app.use('/rubros/', rubrosRoutes_1.default);
        this.app.use('/estados/', estadosRoutes_1.default);
        this.app.use('/presupuestos/', presupuestosRoutes_1.default);
        this.app.use('/detallepresupuesto/', detallepresupuesto_1.default);
    }
    start() {
        this.app.disable('etag');
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
