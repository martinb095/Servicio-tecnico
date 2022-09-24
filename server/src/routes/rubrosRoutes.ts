import { Router } from 'express';
import rubroControllers from '../controllers/rubrosControllers';

class RubroRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los tipo repuestos
        this.router.get('/', rubroControllers.list);
        //Lista un tipo repuestos
        this.router.get('/:PkRubro', rubroControllers.GetOne);

        this.router.post('/registrarrubro', rubroControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkRubro', rubroControllers.delete);
        //Actualizar
        this.router.put('/:PkRubro', rubroControllers.update);
    
    }

}
const rubroRoutes = new RubroRoutes();
export default rubroRoutes.router;