import { Router } from 'express';
import detalletareasControllers from '../controllers/detalleTareasControllers';

class DetalleTareasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los detalletareas
        this.router.get('/', detalletareasControllers.getDetalleTareas);
        //Lista un detalletarea
        this.router.get('/:PkDetalleTarea', detalletareasControllers.GetOne);
        //Crear
        this.router.post('/', detalletareasControllers.create);
        //Eliminar
        this.router.delete('/:PkDetalleTarea', detalletareasControllers.delete);
        //Actualizar
        this.router.put('/:PkDetalleTarea', detalletareasControllers.update);
        
        //Lista detalles por orden
        this.router.get('/ordenrep/:FkOrdenRep', detalletareasControllers.getFindByOrden);

        //Lista detallerepuestos para mostrar
        this.router.get('/detalle/:FkOrdenrep', detalletareasControllers.GetDetallesFindByOrden);
    }

}
const detalletareasRoutes = new DetalleTareasRoutes();
export default detalletareasRoutes.router;