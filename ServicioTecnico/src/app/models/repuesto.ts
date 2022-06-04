export interface Repuesto {
    PkRepuesto: number;
    Nombre: string;
    PrecioCosto: number;
    PrecioVenta: number;
    CantidadStock: number;
    Observacion: string;
    NroSerie: number;
    FkTipoRepuesto: number;
    Activo:Boolean;    
}