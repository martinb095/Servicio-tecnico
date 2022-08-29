export interface Proveedor {
    PkProveedor: number;
    Nombre: string;
    Firma: string;
    FkCiudad?: number;
    Telefono: string;
    Mail: string; 
    Cuit: string;    
    Contacto1: string;    
    Contacto2: string;   
    Activo:Boolean;    
}