import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';

import clientesRoutes from './routes/clientesRoutes';
import marcasRoutes from './routes/marcasRoutes';
import ordenesreparacionRoutes from './routes/ordenesReparacionRoutes';
import productosRoutes from './routes/productosRoutes';
import modelosRoutes from './routes/modelosRoutes';
import tareasRoutes from './routes/tareasRoutes';
import estadosRoutes from './routes/estadosRoutes';
import repuestosRoutes from './routes/repuestosRoutes';
import detalleOrdenRoutes from './routes/detalleordenRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import loginRoutes from './routes/loginRoutes';
import tiporepuestos from './routes/tipoRepuesRoutes';
import mailRoutes from './routes/mailRoutes';
import ciudadRoutes from './routes/ciudadRoutes';
import proveedoresRoutes from './routes/proveedorRoutes';

class Server {

    public app: Application
   
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));      
    }

    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/clientes/', clientesRoutes);
        this.app.use('/ordenesreparacion/', ordenesreparacionRoutes);
        this.app.use('/marcas/', marcasRoutes);
        this.app.use('/productos/', productosRoutes);
        this.app.use('/modelos/', modelosRoutes);
        this.app.use('/estados/', estadosRoutes);
        this.app.use('/tareas/', tareasRoutes);
        this.app.use('/repuestos/', repuestosRoutes);
        this.app.use('/detalleorden/', detalleOrdenRoutes);      
        this.app.use('/usuarios/', usuariosRoutes);
        this.app.use('/login/', loginRoutes);
        this.app.use('/tiporepuestos/', tiporepuestos);
        this.app.use('/mail/', mailRoutes);
        this.app.use('/ciudades/', ciudadRoutes);
        this.app.use('/proveedores/', proveedoresRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();