import { Router } from 'express';
import informesControllers from '../controllers/informesControllers';

class InformesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {     
        this.router.get('/clientestop/', informesControllers.clientesMasVentas);  

        this.router.post('/ordenesfechas', informesControllers.repEntreFechas);        
        
        this.router.post('/stockrepuestos', informesControllers.stockRepuestos);         
    }

}
const informesRoutes = new InformesRoutes();
export default informesRoutes.router;