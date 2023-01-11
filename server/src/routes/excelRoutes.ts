import { Router } from 'express';
import excelControllers from '../controllers/excelControllers';

class ExcelRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/proveedores/', excelControllers.getProveedores);    
        
        this.router.get('/clientes/', excelControllers.getClientes);  

        this.router.get('/usuarios/', excelControllers.getUsuarios);  
    }

}
const excelRoutes = new ExcelRoutes();
export default excelRoutes.router;