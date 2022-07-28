import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetallePedido } from '../models/detallepedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DetallePedidoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerDetallePedidoDePed(idPedido: number) {
    return this.http.get(this.API_URI + "/detallepedido/pedido/" + idPedido);
  }

  EliminarDetallePedido(id: number) {
    return this.http.delete(this.API_URI + "/detallepedido/" + id);
  }

  GuardarDetallePedido(detallePedido: DetallePedido) {       
    return this.http.post(this.API_URI + "/detallepedido", detallePedido);
  }
  
  ActualizarDetallePedido(id: number, updateDetallePedido: DetallePedido) {
    return this.http.put(this.API_URI + "/detallepedido/" + { id }, updateDetallePedido);
  }


}
