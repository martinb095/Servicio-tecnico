import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerExcelProveedores() {  
    return this.http.get(this.API_URI + "/excel/proveedores");
  }

  obtenerExcelClientes() {  
    return this.http.get(this.API_URI + "/excel/clientes");
  }

  obtenerExcelUsuarios() {  
    return this.http.get(this.API_URI + "/excel/usuarios");
  }
}
