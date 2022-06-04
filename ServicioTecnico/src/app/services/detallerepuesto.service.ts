import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleRepuesto } from '../models/detallerepuesto'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DetalleRepuestoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerDetalleRepuestos() {
    return this.http.get(this.API_URI + "/detallerepuestos");
  }

  ObtenerDetalleRepuestosDeOR(idOrden: number) {
    return this.http.get(this.API_URI + "/detallerepuestos/ordenrep/" + idOrden);
  }

  //Para mostrar en la consulta del cliente
  ObtenerDetalleMostrar(idOrden: number) {
    return this.http.get(this.API_URI + "/detallerepuestos/detalle/" + idOrden);
  }

  SelectDetalleRepuesto(id: number) {
    return this.http.get(this.API_URI + "/detallerepuestos/" + id);
  }

  EliminarDetalleRepuesto(id: number) {
    return this.http.delete(this.API_URI + "/detallerepuestos/" + id);
  }

  GuardarDetalleRepuesto(detallerepuesto: DetalleRepuesto) {
    return this.http.post(this.API_URI + "/detallerepuestos", detallerepuesto);
  }

  ActualizarDetalleRepuesto(id: string, updateDetalleRepuesto: DetalleRepuesto) {
    return this.http.put(this.API_URI + "detallerepuestos/" + { id }, updateDetalleRepuesto);
  }

}
