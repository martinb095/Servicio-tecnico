import { Router } from 'express';
import tipoRepuestoControllers from '../controllers/tipoRepControllers';

class TipoRepuestosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los tipo repuestos
        this.router.get('/', tipoRepuestoControllers.list);
        //Lista un tipo repuestos
        this.router.get('/:PkTipoRepuesto', tipoRepuestoControllers.GetOne);

        this.router.post('/registrartiporepuesto', tipoRepuestoControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkTipoRepuesto', tipoRepuestoControllers.delete);
        //Actualizar
        this.router.put('/:PkTipoRepuesto', tipoRepuestoControllers.update);
    
    }

}
const tipoRepuestosRoutes = new TipoRepuestosRoutes();
export default tipoRepuestosRoutes.router;