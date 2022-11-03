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

        this.router.post('/ordenesrepestados', informesControllers.ordenRepEstados);

        this.router.post('/repmasutilizados', informesControllers.repMasUtilizados);

        this.router.get('/detalleorden/:FkOrdenRep', informesControllers.getDetalleOrden);

       
        this.router.get('/detalleestado/:PkOrdenRep', informesControllers.getDetalleEstadoOrden);

        this.router.get('/detallepresupuesto/:FkPresupuesto', informesControllers.getDetallePresupuesto);
    }

}
const informesRoutes = new InformesRoutes();
export default informesRoutes.router;