import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleOrden } from '../models/detalleorden'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DetalleOrdenService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerDetalleORden() {
    return this.http.get(this.API_URI + "/detalleorden");
  }

  ObtenerDetalleOrdenDeOR(idOrden: number) {
    return this.http.get(this.API_URI + "/detalleorden/ordenrep/" + idOrden);
  }

  //Para mostrar en la consulta del cliente
  ObtenerDetalleMostrar(FkOrdenrep: number) {
    return this.http.get(this.API_URI + "/detalleorden/detalle/" + FkOrdenrep);
  }

  SelectDetalleOrden(id: number) {
    return this.http.get(this.API_URI + "/detalleorden/" + id);
  }

  EliminarDetalleOrden(id: number) {      
    return this.http.put(this.API_URI + "/detalleorden/eliminar/" + id, null);
  }

  GuardarDetalleOrden(detalleOrden: DetalleOrden) {   ;
    return this.http.post(this.API_URI + "/detalleorden", detalleOrden);
  }
  
  ActualizarDetalleOrden(id: string, updateDetalleOrden: DetalleOrden) {
    return this.http.put(this.API_URI + "/detalleorden/" + { id }, updateDetalleOrden);
  }

}
