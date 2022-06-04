import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerClientes() {
    return this.http.get(this.API_URI + "/clientes");
  }

  ObtenerCliPorNombre(valor: string) {
    return this.http.get(this.API_URI + "/clientes/filtro/" + valor);
  }

  SelectCliente(id: number) {
    return this.http.get(this.API_URI + "/clientes/" + id);
  }

  EliminarCliente(id: number) {
    return this.http.put(this.API_URI + "/clientes/eliminar/"+ id, null);
  }

  GuardarCliente(cliente: Cliente) {
    return this.http.post(this.API_URI + "/clientes", cliente);
  }

  ActualizarCliente(id: number, updateCliente: Cliente) {
    return this.http.put(this.API_URI + "/clientes/" +  id , updateCliente);
  }

  ValidarCliente(cliente: Cliente) {
    return this.http.post(this.API_URI + "/clientes/validar", cliente);
  }


}
