import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repuesto } from '../models/repuesto'


@Injectable({
  providedIn: 'root'
})

export class RepuestoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerRepuestos(idTipo: number) {
    return this.http.get(this.API_URI + "/repuestos/listar/" + idTipo);
  }

  SelectRepuesto(id: number) {
    return this.http.get(this.API_URI + "/repuestos/" + id);
  }

  EliminarRepuesto(id: number) {
    return this.http.put(this.API_URI + "/repuestos/eliminar/" + id, null);
  }

  GuardarRepuesto(respuesto: Repuesto) {
    return this.http.post(this.API_URI + "/repuestos/nuevorepuesto", respuesto);
  }

  SelectRepuestoSinAsignar(idOrden: number) {
    return this.http.get(this.API_URI + "/repuestos/sinasignar/" + idOrden);
  }

  ActualizarRepuesto(id: number, updateRepuesto: Repuesto) {
    return this.http.put(this.API_URI + "/repuestos/" + id, updateRepuesto);
  }

  ObtenerRepPorNombre(valor: string) {    
    return this.http.get(this.API_URI + "/repuestos/filtro/" + valor);
  }

  

}
