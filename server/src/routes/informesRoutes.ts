import { Router } from 'express';
import informesControllers from '../controllers/informesControllers';

class InformesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
     
        this.router.get('/clientestop/', informesControllers.clientesMasVentas);
          
    }

}
const informesRoutes = new InformesRoutes();
export default informesRoutes.router;