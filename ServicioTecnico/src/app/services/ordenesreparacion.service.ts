import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OrdenReparacion } from '../models/ordenRep'


@Injectable({
  providedIn: 'root'
})
export class OrdenesReparacionService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerOrdenRep() {
    return this.http.get(this.API_URI + "/ordenesreparacion");
  }

  ObtenerDatosOrdenRep(idOrdenRep: number) {
    return this.http.get(this.API_URI + "/ordenesreparacion/detalleestado/" + idOrdenRep);
  }

  ObtenerORsegunCliEstado(FkEstado: number, FkCliente: number) { 
    return this.http.get(this.API_URI + "/ordenesreparacion/filtromenu/" + FkEstado +"/"+ FkCliente);
  }

  ObtenerUltimoIdOrdenRep() {
    // return this.http.get(this.API_URI + "/ordenrep");
    return this.http.get(this.API_URI + "/ordenesreparacion/idultimaorden");
  }
  // ObtenerProdFiltrados(marcaid: number) : Observable<Producto[]>{
  ObtenerOPporEstado(idEstado: number) {
    return this.http.get(this.API_URI + "/ordenesreparacion/estado/" + idEstado);
  }

  ObtenerORporNro(id: number) {
    return this.http.get(this.API_URI + "/ordenesreparacion/nro/" + id);
  }

  SelectOrdenReparaMail(id: number) {
    return this.http.get(this.API_URI + "/ordenesreparacion/mail/" + id);
  }

  SelectOrdenRep(id: number) {
    return this.http.get(this.API_URI + "/ordenesreparacion/" + id);
  }

  EliminarOrdenRep(id: number) {
    return this.http.put(this.API_URI + "/ordenesreparacion/eliminar/" + id, null);
  }


  GuardarOrdenRep(ordenrep: OrdenReparacion) {
    return this.http.post(this.API_URI + "/ordenesreparacion/nuevaorden", ordenrep);
  }

  ActualizarOrdenRep(id: number, updateOrdenRep: OrdenReparacion) {
    return this.http.put(this.API_URI + "/ordenesreparacion/actualizar/" + id, updateOrdenRep);
  }

  ActualizarEstadoOrden(datosCambioEstado:  any) {  
    return this.http.post(this.API_URI + "/ordenesreparacion/actualizarestado/", datosCambioEstado);
  }

  //valida la orden para la consulta del usuario
  ValidarOrdenRep(datosOrden: any) {
    return this.http.post(this.API_URI + "/ordenesreparacion/validar/", datosOrden);
  }
}
