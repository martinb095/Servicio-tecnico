import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetallePresupuesto } from '../models/detallepresupuesto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DetallePresupuestoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerDetallePresupuestoDePresup(idPresupuesto: number) {
    return this.http.get(this.API_URI + "/detallepresupuesto/presupuesto/" + idPresupuesto);
  }

  EliminarPresupuesto(id: number) {
    return this.http.delete(this.API_URI + "/detallepresupuesto/" + id);
  }

  GuardarDetallePresupuesto(detallePresupuesto: DetallePresupuesto) {       
    return this.http.post(this.API_URI + "/detallepresupuesto", detallePresupuesto);
  }
  
  ActualizarDetallePresupuesto(id: number, updateDetallePresupuesto: DetallePresupuesto) {
    return this.http.put(this.API_URI + "/detallepresupuesto/" + { id }, updateDetallePresupuesto);
  }


}
