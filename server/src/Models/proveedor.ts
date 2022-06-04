export interface Proveedor {
    PkProveedor: number;
    Nombre: string;
    Firma: string;
    FkCiudad?: number;
    Telefono: string;
    Mail: string; 
    Cuit: string;    
    Activo:Boolean;    
}