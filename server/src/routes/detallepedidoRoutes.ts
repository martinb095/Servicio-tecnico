import { Router } from 'express';
import detallepedidoControllers from '../controllers/detallePedidoControllers';

class DetallepedidoRoutes {

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
        this.router.post('/', detallepedidoControllers.create);
        //Eliminar
        this.router.delete('/:PkDetallePedido', detallepedidoControllers.delete);       
        //Lista detalles por orden
        this.router.get('/pedido/:FkPedProv', detallepedidoControllers.getFindByPedido);
        //Actualizar
        this.router.put('/:PkDetallePedido', detallepedidoControllers.update);

        //Lista detallerepuestos para mostrar
        //this.router.get('/detalle/:FkOrdenrep', detalleordenControllers.getFindByOrden);
    }

}
const detallepedidoRoutes = new DetallepedidoRoutes();
export default detallepedidoRoutes.router;