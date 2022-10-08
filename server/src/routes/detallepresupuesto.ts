import { Router } from 'express';
import detallepresupuestoControllers from '../controllers/detallePresupuestoControllers';

class DetallePresupuestoRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los detallerepuestos
        //this.router.get('/', detallepedidoRoutes.getDetalleOrden);
        //Lista un detallerepuesto
        //this.router.get('/:PkDetallePedido', detallepedidoRoutes.GetOne);

        //Crear
        this.router.post('/', detallepresupuestoControllers.create);
        //Eliminar
        this.router.delete('/:PkDetallePresup', detallepresupuestoControllers.delete);       
        //Lista detalles por orden
        this.router.get('/presupuesto/:FkPresupuesto', detallepresupuestoControllers.getFindByPresupuesto);
        //Actualizar
        this.router.put('/:PkDetallePresup', detallepresupuestoControllers.update);

        //Lista detallerepuestos para mostrar
        //this.router.get('/detalle/:FkOrdenrep', detalleordenControllers.getFindByOrden);
    }

}
const detallePresupuestoRoutes = new DetallePresupuestoRoutes();
export default detallePresupuestoRoutes.router;