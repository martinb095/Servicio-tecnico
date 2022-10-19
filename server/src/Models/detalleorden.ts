export interface DetalleOrden {
    PkDetalleOrden: number;
    Cantidad: number;
    FkRepuesto: number;
    Precio: number;  
    Observacion:string;
    Fktarea: number;
    FechaCreacion: Date;
    FkOrden: number;
    Costo: number;  
}