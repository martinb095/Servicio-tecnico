import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CiudadService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ObtenerProvincias() {
    return this.http.get(this.API_URI + "/ciudades");
  }

  ObtenerCiudadesXProv(idProv: number) {
    return this.http.get(this.API_URI + "/ciudades/" + idProv);
  }

  ObtenerCiudadesXCod(pkCiudad: number) {
    return this.http.get(this.API_URI + "/ciudades/ciudad/" + pkCiudad);
  }
}
