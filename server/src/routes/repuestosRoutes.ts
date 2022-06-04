import { Router } from 'express';
import repuestosControllers from '../controllers/repuestosControllers';

class RepuestosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista repuestos
        this.router.get('/listar/:FkTipoRepuesto', repuestosControllers.getRepuestos);
        //Lista un repuesto
        this.router.get('/:PkRepuesto', repuestosControllers.GetOne);
        //Lista  repuesto sin asignar
        this.router.get('/sinasignar/:PkOrdenRep', repuestosControllers.getRepuestosSinAsignar);
        //Lista repuestos filtrados por nombre
        this.router.get('/filtro/:Valor', repuestosControllers.getRepuestosFindByNombre);
        //crear
        this.router.post('/nuevorepuesto', repuestosControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkRepuesto', repuestosControllers.delete);
        //Actualizar
        this.router.put('/:PkRepuesto', repuestosControllers.update);
    }

}
const repuestosRoutes = new RepuestosRoutes();
export default repuestosRoutes.router;