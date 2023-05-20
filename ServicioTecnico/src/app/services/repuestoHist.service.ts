import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepuestoHist } from '../models/repuestoHist'


@Injectable({
  providedIn: 'root'
})

export class RepuestoHistService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerHistorialRep(id: number) {
    return this.http.get(this.API_URI + "/repuestoshist/" + id);
  } 

}
