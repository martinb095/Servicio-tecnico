import { Router } from 'express';
import tareasControllers from '../controllers/tareasControllers';

class TareasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', tareasControllers.getTareas);
        //Lista un tarea
        this.router.get('/:PkTarea', tareasControllers.GetOne);
        //Lista  tareas sin asignar
        this.router.get('/sinasignar/:PkOrdenRep', tareasControllers.getTareasSinAsignar);
        //crear
        this.router.post('/nuevatarea', tareasControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkTarea', tareasControllers.delete);
        //Actualizar
        this.router.put('/:PkTarea', tareasControllers.update);
    }

}
const tareasRoutes = new TareasRoutes();
export default tareasRoutes.router;