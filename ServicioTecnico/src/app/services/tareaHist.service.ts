import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TareaHist } from '../models/tareaHist'


@Injectable({
  providedIn: 'root'
})

export class TareaHistService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerHistorialTarea(id: number) {
    return this.http.get(this.API_URI + "/tareashist/" + id);
  } 

}
