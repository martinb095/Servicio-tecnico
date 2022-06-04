export interface OrdenReparacion {
    PkOrdenreparacion: number;
    FechaInicio?: string;
    FecRetiroEstimado?: string;
    DescripProblema?: string;
    FkModelo?: number;
    FkCliente?: number;
    FkEstado: number;
    FkUsuario?: number;
    Observacion?: string;     
}