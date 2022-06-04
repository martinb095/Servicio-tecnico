import { Router } from 'express';
import usuariosControllers from '../controllers/usuariosControllers';

class UsuariosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', usuariosControllers.getUsuarios);
        //Lista un tarea
        this.router.get('/:PkUsuario', usuariosControllers.getOne);
        //crear
        this.router.post('/nuevousuario', usuariosControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkUsuario', usuariosControllers.delete);
        //Actualizar
        this.router.put('/:PkUsuario', usuariosControllers.update);
    }

}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;