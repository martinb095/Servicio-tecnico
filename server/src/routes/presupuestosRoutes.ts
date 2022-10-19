import { Router } from 'express';
import presupuestosControllers from '../controllers/presupuestosController';

class PresupuestosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
      
        this.router.get('/:FechaDesde/:FechaHasta/:aceptado', presupuestosControllers.getPresupuestos);
  
        this.router.get('/:PkPresupuesto', presupuestosControllers.getOne);
        //Eliminar
        this.router.put('/eliminar/:PkPresupuesto', presupuestosControllers.delete);
        //Nuevo
        this.router.post('/nuevopresupuesto', presupuestosControllers.create);
        //Actualizar
        this.router.put('/actualizar/:PkPresupuesto', presupuestosControllers.update);
        //Procesar
        this.router.put('/confirmar/:PkPresupuesto', presupuestosControllers.confirmar);
    }

}
const presupuestosRoutes = new PresupuestosRoutes();
export default presupuestosRoutes.router;