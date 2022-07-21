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
}
