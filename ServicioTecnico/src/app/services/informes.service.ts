import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InformesService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ClientesMasOrdenes() {  
    return this.http.get(this.API_URI + "/informes/clientestop");
  }

  OrdenesFechas(filtro: any) {   
    return this.http.post(this.API_URI + "/informes/ordenesfechas", filtro);
  }

  StockRepuestos(filtro: any) {   
    return this.http.post(this.API_URI + "/informes/stockrepuestos", filtro);
  }

  ordenesRepEstados(filtro: any) {   
    return this.http.post(this.API_URI + "/informes/ordenesrepestados", filtro);
  }

  repMasUtilizados(filtro: any) {   
    return this.http.post(this.API_URI + "/informes/repmasutilizados", filtro);
  }

  ObtenerDetalleOrdenDeOR(idOrden: number) {
    return this.http.get(this.API_URI + "/informes/detalleorden/" + idOrden);
  }

  ObtenerDatosOrdenRep(idOrdenRep: number) {
    return this.http.get(this.API_URI + "/informes/detalleestado/" + idOrdenRep);
  }

  ObtenerDetallePresupuestoDePresup(idPresupuesto: number) {
    return this.http.get(this.API_URI + "/informes/detallepresupuesto/" + idPresupuesto);
  }

  obtenerClientesTop(filtro: any) {    
    return this.http.post(this.API_URI + "/informes/repormasutilizados", filtro);
  }
  
}
