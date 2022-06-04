import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modelo } from '../models/modelo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModeloService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerModelos() {
    return this.http.get(this.API_URI + "/modelos");
  }

  ObtenerModelosFindByMarca(id: number) {
    return this.http.get(this.API_URI + "/modelos/marca/" +  id );
  }

  SelectModelo(id: number) {
    return this.http.get(this.API_URI + "/modelos/" +  id );
  }

  ObtenerModeloCompleto(id: number) {
    return this.http.get(this.API_URI + "/modelos/completo/" +  id );
  }

  EliminarModelo(id: number) {
    return this.http.put(this.API_URI + "/modelos/eliminar/"+ id, null);
  }

  GuardarModelo(modelo: Modelo  ) {
    return this.http.post(this.API_URI + "/modelos/nuevomodelo", modelo);
  }

  ActualizarModelo(id: number, updateModelo: Modelo) {
    return this.http.put(this.API_URI + "/modelos/" +  id , updateModelo);
  }

  ObtenerModeloPorNombre(valor: string) {
    return this.http.get(this.API_URI + "/modelos/filtro/" + valor);
  }
}
