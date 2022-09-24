import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rubro } from '../models/rubro'


@Injectable({
  providedIn: 'root'
})

export class RubroService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerRubro() {
    return this.http.get(this.API_URI + "/rubros");
  }

  SelectRubro(id: string) {
    return this.http.get(this.API_URI + "/rubros/" +  id );//{}
  }

  EliminarRubros(id: number) {
    return this.http.put(this.API_URI + "/rubros/eliminar/"+ id, null);
  }

  GuardarRubro(rubros: Rubro) {
    return this.http.post(this.API_URI + "/rubros/registrarrubro", rubros);
  }

  ActualizarRubro(id: number, updateRubro: Rubro) {
    return this.http.put(this.API_URI + "/rubros/" +  id , updateRubro);
  }

}
