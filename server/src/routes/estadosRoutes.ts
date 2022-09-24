import { Router } from 'express';
import estadosControllers from '../controllers/estadosControllers';

class EstadosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
     
        this.router.get('/', estadosControllers.getEstados);
     
        this.router.get('/:PkEstado', estadosControllers.GetOne);

        this.router.post('/', estadosControllers.create);
        //Eliminar
        this.router.delete('/:PkEstado', estadosControllers.delete);
        //Actualizar
        this.router.put('/:PkEstado', estadosControllers.update);

        this.router.get('/:PkOrdenRep', estadosControllers.getHistorialEstados);
    }

}
const estadosRoutes = new EstadosRoutes();
export default estadosRoutes.router;