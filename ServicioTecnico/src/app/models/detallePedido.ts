export interface DetallePedido {
    PkDetallePedido: number;
    FkPedProv: number;
    FkRepuesto: number;
    Observacion: string;
    Cantidad: number;
}