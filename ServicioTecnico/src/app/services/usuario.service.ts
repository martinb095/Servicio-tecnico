import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../models/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerUsuario() {   
    return this.http.get(this.API_URI + "/usuarios");
  }

  EliminarUsuario(id: number) {
    return this.http.put(this.API_URI + "/usuarios/eliminar/"+ id, null);
  }

  GuardarUsuario(usuario: Usuario) {
    return this.http.post(this.API_URI + "/usuarios/nuevousuario", usuario);
  }

  ActualizarUsuario(id: number, updateUsuario: Usuario) { 
    return this.http.put(this.API_URI + "/usuarios/" + id, updateUsuario);
  }

}
