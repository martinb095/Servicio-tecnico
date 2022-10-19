export interface Cliente {
    PkCliente: number;
    Nombre: string;
    Apellido: string;    
    Telefono: string;
    FkCiudad?: number;
    Calle: string;
    Numero: number;
    Piso: number;
    Depto: string;
    Mail: string;
    Contrasenia: string;     
    Activo:Boolean;    
}