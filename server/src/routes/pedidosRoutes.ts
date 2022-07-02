import { Router } from 'express';
import pedidosControllers from '../controllers/pedidosControllers';

class PedidosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los clientes
        this.router.get('/', pedidosControllers.getPedidos);

        this.router.get('/:PkPedProv', pedidosControllers.getOne);
        //Eliminar
        this.router.put('/eliminar/:PkPedProv', pedidosControllers.delete);
        //Nuevo
        this.router.post('/nuevopedido', pedidosControllers.create);
        //Actualizar
        this.router.put('/actualizar/:PkPedProv', pedidosControllers.update);
        //Procesar
        this.router.put('/procesar/:PkPedProv', pedidosControllers.procesar);
    }

}
const pedidosRoutes = new PedidosRoutes();
export default pedidosRoutes.router;