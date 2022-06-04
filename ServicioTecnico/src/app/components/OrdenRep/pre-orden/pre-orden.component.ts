import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-pre-orden',
  templateUrl: './pre-orden.component.html',
  styleUrls: ['./pre-orden.component.css']
})

export class PreOrdenComponent implements OnInit {

  listCliente: Cliente[] = [];

  pageActual: number = 1;

  constructor(
    private clientesService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');    
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerClientes();
  }

  ObtenerClientes() {
    this.listCliente = [];
    this.clientesService.ObtenerClientes().subscribe(
      (res: any) => {
        this.listCliente = res;
      },
      err => console.error(err)
    );
  }

}
