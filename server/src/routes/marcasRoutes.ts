import { Router } from 'express';
import marcasControllers from '../controllers/marcasControllers';

class MarcasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos las marcas
        this.router.get('/', marcasControllers.list);
        //Lista un cliente
        this.router.get('/:PkMarca', marcasControllers.GetOne);

        //Lista marcas filtrados por nombre
        this.router.get('/filtro/:Valor', marcasControllers.getMarcasFindByNombre);

        this.router.post('/nuevamarca', marcasControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkMarca', marcasControllers.delete);
        //Actualizar
        this.router.put('/:PkMarca', marcasControllers.update);

        //Lista una marca por producto
        //this.router.get('/producto/:FkProducto', marcasControllers.MarcasFindByProducto);
    }

}
const marcasRoutes = new MarcasRoutes();
export default marcasRoutes.router;