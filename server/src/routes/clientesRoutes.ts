import { Router } from 'express';
import clientesControllers from '../controllers/clientesControllers';

class ClientesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista todos los clientes
        this.router.get('/', clientesControllers.getClientes);
        //Lista un cliente
        this.router.get('/:PkCliente', clientesControllers.GetOne);
        //Lista clientes filtrados por nombre
        this.router.get('/filtro/:Valor', clientesControllers.getClientesFindByNombre);
        //Crear
        this.router.post('/', clientesControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkCliente', clientesControllers.delete);
        //Actualizar
        this.router.put('/:PkCliente', clientesControllers.update);

    }

}
const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;