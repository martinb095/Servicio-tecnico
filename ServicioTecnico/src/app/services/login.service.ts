import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../models/usuario'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ValidarUsuario(usuario: Usuario) {
    return this.http.post(this.API_URI + "/login", usuario);
  }

  getPass(mail: string) {       
    return this.http.get(this.API_URI + "/login/mail/" + mail);    
  } 
 
}
