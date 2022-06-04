import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleTarea } from '../models/detalletarea'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DetalleTareaService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerDetalleTareas() {
    return this.http.get(this.API_URI + "/detalletareas");
  }

  //Para mostrar en la consulta del cliente
  ObtenerDetalleMostrar(idOrden: number) {
    return this.http.get(this.API_URI + "/detalletareas/detalle/" + idOrden);
  }

  ObtenerDetalleTareasDeOR(idOrden: number) {
    return this.http.get(this.API_URI + "/detalletareas/ordenrep/" + idOrden);
  }

  SelectDetalleTarea(id: number) {
    return this.http.get(this.API_URI + "/detalletareas/" + id);
  }

  EliminarDetalleTarea(id: number) {
    return this.http.delete(this.API_URI + "/detalletareas/" + id);
  }

  GuardarDetalleTarea(detalletarea: DetalleTarea) {
    return this.http.post(this.API_URI + "/detalletareas", detalletarea);
  }

  ActualizarDetalleTarea(id: number, updateDetalleTarea: DetalleTarea) {
    return this.http.put(this.API_URI + "detalletareas/" + { id }, updateDetalleTarea);
  }

}
