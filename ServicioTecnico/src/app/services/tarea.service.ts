import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/tarea'


@Injectable({
  providedIn: 'root'
})

export class TareaService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerTareas() {
    return this.http.get(this.API_URI + "/tareas");
  }

  SelectTarea(id: number) {
    return this.http.get(this.API_URI + "/tareas/" +  id );
  }

  SelectTareaSinAsignar(idOrden: number) {
    return this.http.get(this.API_URI + "/tareas/sinasignar/" +  idOrden );
  }

  EliminarTarea(id: number) {
    return this.http.put(this.API_URI + "/tareas//eliminar/"+ id, null);
  }

  GuardarTarea(tarea: Tarea) {
    return this.http.post(this.API_URI + "/tareas/nuevatarea", tarea);
  }


  ActualizarTarea(id: number, updateTarea: Tarea) {
    return this.http.put(this.API_URI + "/tareas/" +  id , updateTarea);
  }

}
