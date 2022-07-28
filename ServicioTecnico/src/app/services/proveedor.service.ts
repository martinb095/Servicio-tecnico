import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/proveedor'

@Injectable({
  providedIn: 'root'
})

export class ProveedorService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerProveedores() {
    return this.http.get(this.API_URI + "/proveedores");
  }

  ObtenerProvPorNombre(valor: string) {
    return this.http.get(this.API_URI + "/proveedores/filtro/" + valor);
  }

  SelectPRoveedor(id: number) {
    return this.http.get(this.API_URI + "/proveedores/" + id);
  }

  EliminarProveedor(id: number) {
    return this.http.put(this.API_URI + "/proveedores/eliminar/"+ id, null);
  }

  GuardarProveedor(cliente: Proveedor) {
    return this.http.post(this.API_URI + "/proveedores", cliente);
  }

  ActualizarProveedor(id: number, updateProveedor: Proveedor) {
    return this.http.put(this.API_URI + "/proveedores/" +  id , updateProveedor);
  }

  ValidarProveedor(proveedor: Proveedor) {
    return this.http.post(this.API_URI + "/proveedores/validar", proveedor);
  }


}
