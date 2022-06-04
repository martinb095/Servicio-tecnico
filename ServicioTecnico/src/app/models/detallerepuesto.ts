import { Repuesto } from './repuesto';

export interface DetalleRepuesto {
    PkDetalleRepuesto: number;
    Cantidad: number;
    FkRepuesto: number;
    Precio: number;  
    FkOrdenrep:number;
    Repuesto: Repuesto;
}