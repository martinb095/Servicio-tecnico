import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estado } from '../models/estado'

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerEstado() {
    // return this.http.get(this.API_URI + "/ordenrep");
    return this.http.get(this.API_URI + "/estados");
  }

  SelectEstado(id: string) {
    return this.http.get(this.API_URI + "/estados/" + id);
  }

  EliminarEstado(id: string) {
    return this.http.delete(this.API_URI + "/estados/" + id);
  }

  GuardarEstado(estado: Estado) {
    return this.http.post(this.API_URI + "/estados/nuevoestado", estado);
  }

  ActualizarEstado(id: string, updateEstado: Estado) {
    return this.http.put(this.API_URI + "/estados/actualizar/" + id, updateEstado);
  }



}
