import { Router } from 'express';
import ordenesreparacionControllers from '../controllers/ordenesRepControllers';

class OrdenesReparacionRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los ordenes     
        this.router.get('/', ordenesreparacionControllers.getOrdenes);
        //obtener ultimo id     
        this.router.get('/idultimaorden', ordenesreparacionControllers.getLastIdOrden);
        //Lista una orden
        this.router.get('/:PkOrdenRep', ordenesreparacionControllers.GetOne);
        //Lista un orden para correo
        this.router.get('/mail/:PkOrdenRep', ordenesreparacionControllers.GetOneForEmail);
        //Lista un orden y el estado
        this.router.get('/detalleestado/:PkOrdenRep', ordenesreparacionControllers.getDetalleEstadoOrden);

        //Lista un ordenes para el filtro del menuordenes
        this.router.get('/filtromenu/:FkEstado/:FkCliente', ordenesreparacionControllers.getOrdenesFindByCliEstado);

        //Lista un ordenes por estado
        this.router.get('/estado/:FkEstado', ordenesreparacionControllers.getOrdenesFindByEstado);
        //Lista ordenes filtradas por nro para el menu
        this.router.get('/nro/:PkOrdenRep', ordenesreparacionControllers.getOrdenesFindByNro);

        //Nueva
        this.router.post('/nuevaorden', ordenesreparacionControllers.create);

        //Eliminar               
        this.router.put('/eliminar/:PkOrden', ordenesreparacionControllers.delete);
  
        //Actualizar
        this.router.put('/actualizar/:PkOrdenRep', ordenesreparacionControllers.update);
        //Actualizar estado
        this.router.post('/actualizarestado/', ordenesreparacionControllers.updateEstado);

        //validar orden
        this.router.post('/validar', ordenesreparacionControllers.ValidarOrden);
    }

}
const ordenesreparacionRoutes = new OrdenesReparacionRoutes();
export default ordenesreparacionRoutes.router;