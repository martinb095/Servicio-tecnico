export interface Cliente {
    PkCliente: number;
    Nombre: string;
    Apellido: string;
    Telefono: string;
    FkCiudad?: number;
    Direccion: string;
    Mail: string;
    Contrasenia: string;    
    Activo:Boolean;    
}