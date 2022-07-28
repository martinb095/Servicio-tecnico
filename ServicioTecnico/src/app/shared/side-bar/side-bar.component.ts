import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  username: string = localStorage.getItem('username');

  constructor() { }

  ngOnInit() {

    let tipo = localStorage.getItem('tipoUsuario');
    //admin
    if (tipo == "2") {
      document.getElementById("liOrdenRep").style.display = 'none';
      document.getElementById("liCliente").style.display = 'none';
      document.getElementById("liTarea").style.display = 'none';
      document.getElementById("liModelo").style.display = 'none';
      document.getElementById("liMarca").style.display = 'none';
      document.getElementById("liInforme").style.display = 'none';
      document.getElementById("liHerramienta").style.display = 'none';
    //tecnico
    } else if (tipo == "3") {
      document.getElementById("liRepuesto").style.display = 'none';
      document.getElementById("liCliente").style.display = 'none';
      document.getElementById("liProveedor").style.display = 'none';
      document.getElementById("liPedido").style.display = 'none';
      document.getElementById("liTarea").style.display = 'none';
      document.getElementById("liModelo").style.display = 'none';
      document.getElementById("liMarca").style.display = 'none';
      document.getElementById("liInforme").style.display = 'none';
      document.getElementById("liHerramienta").style.display = 'none';
    }   

  }

}
