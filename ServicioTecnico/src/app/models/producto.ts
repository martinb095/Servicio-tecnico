import { TipoRepuesto } from './tiporepuesto';

export interface Producto {
    PkProducto: number;
    Nombre: string;
    Observacion: string;
    tiporepuesto:TipoRepuesto;    
}