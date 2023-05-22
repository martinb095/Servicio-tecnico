import { Router } from 'express';
import tareasHistControllers from '../controllers/tareasHistControllers';

class TareasHistRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {       
     
        this.router.get('/:PkTarea', tareasHistControllers.getTareasFindByTarea);   

    }

}
const tareasHistRoutes = new TareasHistRoutes();
export default tareasHistRoutes.router;