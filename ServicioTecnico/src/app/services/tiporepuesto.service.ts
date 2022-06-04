import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoRepuesto } from '../models/tiporepuesto'


@Injectable({
  providedIn: 'root'
})

export class TipoRepuestoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerTipoRepuesto() {
    return this.http.get(this.API_URI + "/tiporepuestos");
  }

  SelectTipoRepuesto(id: string) {
    return this.http.get(this.API_URI + "/tiporepuestos/" +  id );//{}
  }

  EliminarTipoRepuesto(id: number) {
    return this.http.put(this.API_URI + "/tiporepuestos/eliminar/"+ id, null);
  }

  GuardarTipoRepuesto(tipoResp: TipoRepuesto) {
    return this.http.post(this.API_URI + "/tiporepuestos/registrartiporepuesto", tipoResp);
  }

  ActualizarTipoRepuesto(id: number, updateTipoRep: TipoRepuesto) {
    return this.http.put(this.API_URI + "/tiporepuestos/" +  id , updateTipoRep);
  }

}
