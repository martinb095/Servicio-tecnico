import { Repuesto } from './repuesto';

export interface DetalleOrden {
    PkDetalleOrden: number;
    Cantidad: number;
    FkRepuesto: number;
    
    Precio: number;  
    Observacion:string;
    FkTarea: number;
    FechaCreacion: Date;
    FkOrden: number;
}