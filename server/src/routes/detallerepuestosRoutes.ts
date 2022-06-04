import { Router } from 'express';
import detallerepuestosControllers from '../controllers/detalleRepuestosControllers';

class DetallerepuestosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los detallerepuestos
        this.router.get('/', detallerepuestosControllers.getDetalleRepuestos);
        //Lista un detallerepuesto
        this.router.get('/:PkDetallerepuesto', detallerepuestosControllers.GetOne);

        //Crear
        this.router.post('/', detallerepuestosControllers.create);
        //Eliminar
        this.router.delete('/:PkDetallerepuesto', detallerepuestosControllers.delete);
        //Actualizar
        this.router.put('/:PkDetallerepuesto', detallerepuestosControllers.update);
        //Lista detalles por orden
        this.router.get('/ordenrep/:FkOrdenRep', detallerepuestosControllers.getFindByOrden);

        //Lista detallerepuestos para mostrar
        this.router.get('/detalle/:FkOrdenrep', detallerepuestosControllers.getFindByOrden);
    }

}
const detallerepuestosRoutes = new DetallerepuestosRoutes();
export default detallerepuestosRoutes.router;