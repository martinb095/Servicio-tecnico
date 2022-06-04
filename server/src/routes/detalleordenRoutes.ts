import { Router } from 'express';
import detalleordenControllers from '../controllers/detalleOrdenControllers';

class DetalleordenRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los detallerepuestos
        this.router.get('/', detalleordenControllers.getDetalleOrden);
        //Lista un detallerepuesto
        this.router.get('/:PkDetalle', detalleordenControllers.GetOne);

        //Crear
        this.router.post('/', detalleordenControllers.create);
        //Eliminar
        this.router.delete('/:PkDetalle', detalleordenControllers.delete);
        //Actualizar
        this.router.put('/:PkDetalle', detalleordenControllers.update);
        //Lista detalles por orden
        this.router.get('/ordenrep/:FkOrdenRep', detalleordenControllers.getFindByOrden);

        //Lista detallerepuestos para mostrar
        this.router.get('/detalle/:FkOrdenrep', detalleordenControllers.getFindByOrden);
    }

}
const detalleordenRoutes = new DetalleordenRoutes();
export default detalleordenRoutes.router;