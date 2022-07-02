import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerPedidos() {
    return this.http.get(this.API_URI + "/pedidos");
  }

  obtenerPedido(idPedido: number) {
    return this.http.get(this.API_URI + "/pedidos/" + idPedido);
  }

  EliminarPedido(id: number) {
    return this.http.put(this.API_URI + "/pedidos/eliminar/" + id, null);
  }

  GuardarPedido(pedido: Pedido) {
    return this.http.post(this.API_URI + "/pedidos/nuevopedido", pedido);
  }

  ActualizarPedido(id: number, updatePedido: Pedido) {
    return this.http.put(this.API_URI + "/pedidos/actualizar/" + id, updatePedido);
  }

  ProcesarPedido(id: number) {
    return this.http.put(this.API_URI + "/pedidos/procesar/" + id, null);
  }
}
