export interface DetalleOrden {
    PkDetalleOrden: number;
    Cantidad: number;
    FkRepuesto: number;    
    Precio: number;  
    Observacion:string;
    FkTarea: number;
    FechaCreacion: string;
    FkOrden: number;
}