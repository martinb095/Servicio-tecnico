export interface DetallePresupuesto {
    PkDetallePresup: number;
    Precio: number;
    FkRepuesto: number;
    Observacion: string;
    Cantidad: number;
    FkTarea: number;
    Costo: number;
}