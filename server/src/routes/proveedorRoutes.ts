import { Router } from 'express';
import proveedoresControllers from '../controllers/proveedoresControllers';

class ProveedoresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los proveedores
        this.router.get('/', proveedoresControllers.getProveedores);
        //Lista un cliente
        this.router.get('/:PkProveedor', proveedoresControllers.GetOne);
        //Lista proveedores filtrados por nombre
        this.router.get('/filtro/:Valor', proveedoresControllers.getProveedoresFindByNombre);
        //Crear
        this.router.post('/', proveedoresControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkProveedor', proveedoresControllers.delete);
        //Actualizar
        this.router.put('/:PkProveedor', proveedoresControllers.update);

        this.router.get('/descargarexcel/:PkProveedor', (req, res) => {           
            const rutaArchivo = 'C:\\Users\\Martin B\\Desktop\\ServicioTecnico-GIT\\ServicioTecnico\\src\\app\\ExcelProvedores\\ListaProv-' + req.params.PkProveedor + '.xls'; // Ruta física del archivo Excel          
            res.download(rutaArchivo, 'ListaProv-' + req.params.PkProveedor + '.xls', (err) => {
                if (err) {                 
                    console.error(err);
                }
            });
        });
    }

}
const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;