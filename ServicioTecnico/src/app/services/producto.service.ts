import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto'
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerProductos() {
    return this.http.get(this.API_URI + "/productos");
  }

  SelectProducto(id: number) {
    return this.http.get(this.API_URI + "/productos/" +  id );//{}
  }

  EliminarProducto(id: number) {
    return this.http.put(this.API_URI + "/productos/eliminar/"+ id, null);
  }

  GuardarProducto(producto: Producto) {
    return this.http.post(this.API_URI + "/productos/nuevoproducto", producto);
  }

  ActualizarProducto(id: number, updateProducto: Producto) {
    return this.http.put(this.API_URI + "/productos/" +  id , updateProducto);
  }

  ObtenerProdPorNombre(valor: string) {
    return this.http.get(this.API_URI + "/productos/filtro/" + valor);
  }

}
