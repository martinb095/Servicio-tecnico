import { Router } from 'express';
import modelosControllers from '../controllers/modelosControllers';

class ModelosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista modelos segun marca
        this.router.get('/', modelosControllers.getModelos);
        //Lista un modelos
        this.router.get('/:PkModelo', modelosControllers.GetOne);

        //Lista modelos filtrados por nombre
        this.router.get('/filtro/:Valor', modelosControllers.getModelosFindByNombre);
        
        //Lista un modelo por marca
        this.router.get('/marca/:FkMarca', modelosControllers.getModelosFindByMarca);

        this.router.post('/nuevomodelo', modelosControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkModelo', modelosControllers.delete);
        //Actualizar
        this.router.put('/:PkModelo', modelosControllers.update);
    }

}
const modelosRoutes = new ModelosRoutes();
export default modelosRoutes.router;