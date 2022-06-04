export interface Usuario {
    PkUsuario: number;
    Nombre: string;
    Contrasenia: string;
    FkTipoUsuario: number;
    UltimoIngreso:Date;
    Activo:Boolean;
}