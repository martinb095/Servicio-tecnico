import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presupuesto } from '../models/presupuesto'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PresupuestoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerPresupuestos(fechaDesde: string, fechaHasta: string, aceptado: number) {
    return this.http.get(this.API_URI + "/presupuestos/" + fechaDesde + "/" + fechaHasta+ "/" + aceptado);
  }

  obtenerPresupuesto(idPresupuesto: number) {
    return this.http.get(this.API_URI + "/presupuestos/" + idPresupuesto);
  }

  EliminarPresupuesto(id: number) {
    return this.http.put(this.API_URI + "/presupuestos/eliminar/" + id, null);
  }

  ConfirmarPresupuesto(id: number) {
    return this.http.put(this.API_URI + "/presupuestos/confirmar/" + id, null);
  }

  GuardarPresupuestos(presupuesto: Presupuesto) {
    return this.http.post(this.API_URI + "/presupuestos/nuevopresupuesto", presupuesto);
  }

  ActualizarPresupuestos(id: number, updatePresupuesto: Presupuesto) {
    return this.http.put(this.API_URI + "/presupuestos/actualizar/" + id, updatePresupuesto);
  }

  //   ProcesarPedido(id: number) {
  //     return this.http.put(this.API_URI + "/pedidos/procesar/" + id, null);
  //   }
}
