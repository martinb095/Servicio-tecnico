import { Router } from 'express';
import ciudadesControllers from '../controllers/ciudadesControllers';

class CiudadRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos las provincias
        this.router.get('/', ciudadesControllers.GetProvincias);
        //Lista una ciudad por provincia
        this.router.get('/:PkProvincia', ciudadesControllers.GetCiudadesFindByProv);
        //Lista una ciudad por codigo
        this.router.get('/ciudad/:PkCiudad', ciudadesControllers.GetCiudadesFindByCod);
      
    }

}
const ciudadRoutes = new CiudadRoutes();
export default ciudadRoutes.router;