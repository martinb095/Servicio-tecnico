import { Router } from 'express';
import repuestosHistControllers from '../controllers/repuestosHistControllers';

class RepuestosHistRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {       
     
        this.router.get('/:PkRepuesto', repuestosHistControllers.getRepuestosFindByRepuesto);   

    }

}
const repuestosHistRoutes = new RepuestosHistRoutes();
export default repuestosHistRoutes.router;