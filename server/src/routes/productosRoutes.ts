import { Router } from 'express';
import productosControllers from '../controllers/productosControllers';

class ProductosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Lista productos segun marca
        this.router.get('/', productosControllers.getProductos);
        //Lista un producto
        this.router.get('/:PkProducto', productosControllers.getOne);
        //Lista productos filtrados por nombre
        this.router.get('/filtro/:Valor', productosControllers.getProductosFindByNombre);

        this.router.post('/nuevoproducto', productosControllers.create);
        //Eliminar
        this.router.put('/eliminar/:PkProducto', productosControllers.delete);
        //Actualizar
        this.router.put('/:PkProducto', productosControllers.update);
    }

}
const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;