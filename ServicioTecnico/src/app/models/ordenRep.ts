
import { DetalleRepuesto } from './detallerepuesto';
import { DetalleTarea } from './detalletarea';
import { Repuesto } from './repuesto';
import { Tarea } from './tarea';

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
    detalleRepuestos?: DetalleRepuesto[];
    detalleTareas?: DetalleTarea[];
}