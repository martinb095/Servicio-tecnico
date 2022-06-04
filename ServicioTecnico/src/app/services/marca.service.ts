import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MarcaService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // ObtenerMarcas() {
  //   return this.http.get(this.API_URI + "/marcas");
  // }

  ObtenerMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.API_URI + '/marcas');
  }

  SelectMarca(id: number) {
    return this.http.get(this.API_URI + "/marcas/" + id);
  }

  EliminarMarca(id: number) {
    return this.http.put(this.API_URI + "/marcas/eliminar/" + id, null);
  }

  GuardarMarca(marca: Marca) {
    return this.http.post(this.API_URI + "/marcas/nuevamarca", marca);
  }

  ActualizarMarca(id: number, updateMarca: Marca) {
    return this.http.put(this.API_URI + "/marcas/" + id, updateMarca);
  }

  ObtenerMarcaFiltradas(idProducto: number) {
    return this.http.get(this.API_URI + "/marcas/producto/" + idProducto);
  }

  ObtenerMarcaPorNombre(valor: string) {
    return this.http.get(this.API_URI + "/marcas/filtro/" + valor);
  }

}
