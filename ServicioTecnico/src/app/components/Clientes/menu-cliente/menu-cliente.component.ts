import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { SharedService } from 'src/app/services/shared.service';

import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

import { CiudadService } from 'src/app/services/ciudad.service';
import { Ciudad } from 'src/app/models/ciudad';


@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {

  listCliente: Cliente[] = [];
  listProvincias: any[] = [];
  listCiudades: any[] = [];

  //Valor que toma el input de buscar
  clienteBuscar: string;

  idProvincia: number;

  contraseniaRep = "";

  pageActual: number = 1;

  cliente: Cliente = {
    PkCliente: 0,
    Nombre: "",
    Apellido: "",
    Telefono: null,
    FkCiudad: null,
    Direccion: null,
    Mail: null,
    Contrasenia: null,
    Activo: null
  };

  constructor(
    private modalService: ModalService,
    private clienteService: ClienteService,
    private ciudadService: CiudadService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerProvincias();
    this.ObtenerClientes();
  }

  ObtenerClientes() {
    this.listCliente = [];
    this.clienteService.ObtenerClientes().subscribe(
      (res: any) => {
        this.listCliente = res;        
      },
      err => console.error(err)
    );
  }

  ObtenerProvincias() {
    this.listProvincias = [];
    this.ciudadService.ObtenerProvincias().subscribe(
      (res: any) => {
        this.listProvincias = res;
      },
      err => console.error(err)
    );
  }

  onSelectCiudad(idCiudad: number) {
    this.listCiudades = [];
    this.ciudadService.ObtenerCiudadesXCod(idCiudad).subscribe(
      (res: any) => {
        this.listCiudades = res;
        this.idProvincia = res[0].FkProvincia;
      },
      err => console.error(err)
    );
  }

  onSelectProv(idProv: number) {
    this.listCiudades = [];
    this.ciudadService.ObtenerCiudadesXProv(idProv).subscribe(
      (res: any) => {
        this.listCiudades = res;
      },
      err => console.error(err)
    );
  }

  ClienteSegunNombre(valor: string) {
    this.listCliente = [];
    if (valor != "") {
      this.clienteService.ObtenerCliPorNombre(valor).subscribe((data: Cliente[]) => {
        this.listCliente = data;
      },
        err => console.error(err)
      );
    } else {
      this.ObtenerClientes();
    }
  }

  EliminarCliente(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el cliente Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.EliminarCliente(id).subscribe(res => {
          this.ObtenerClientes();
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Cliente Nro. " + id + " eliminado correctamente." })

      }
    })
  }

  GuardarCliente() {
    this.cliente.Activo = true;
    if (this.cliente.Nombre == "" || this.cliente.Nombre == null) {
      Swal.fire({ title: "El nombre del cliente no puede estar vacio.", icon: "warning" });
      return;
    }
    if (this.cliente.Contrasenia != this.contraseniaRep) {
      Swal.fire({ title: "La contraseñas no coinciden.", icon: "warning" });
      return;
    }
    //Almacena cliente   
    this.clienteService.GuardarCliente(this.cliente).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoCliente');
          Swal.fire({ title: "Cliente guardado correctamente.", icon: "success" });
          this.ObtenerClientes();
        }
      },
      err => console.error(err)
    )
  }

  //Obtiene el cliente de la fila y la asigna al objeto que despues actualiza
  SetValores(cliente: Cliente) {
    this.cliente = {
      PkCliente: cliente.PkCliente,
      Nombre: cliente.Nombre,
      Apellido: cliente.Apellido,
      Telefono: cliente.Telefono,
      FkCiudad: cliente.FkCiudad,
      Direccion: cliente.Direccion,
      Mail: cliente.Mail,
      Contrasenia: cliente.Contrasenia,
      Activo: cliente.Activo
    };
    this.contraseniaRep = cliente.Contrasenia;
    //Falta Obtener la Provincia 
    this.onSelectCiudad(cliente.FkCiudad);
  }

  ModificarCliente() {
    //Modifica cliente   
    if (this.cliente.Nombre == "" || this.cliente.Nombre == null) {
      Swal.fire({ title: "El nombre del cliente no puede estar vacio.", icon: "warning" });
      return;
    }
    if (this.cliente.Contrasenia != this.contraseniaRep) {
      Swal.fire({ title: "La contraseñas no coinciden.", icon: "warning" });
      return;
    }
    this.clienteService.ActualizarCliente(this.cliente.PkCliente, this.cliente).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalEditarCliente');
          Swal.fire({ title: "Cliente modificado correctamente.", icon: "success" });
          this.ObtenerClientes();
        }
      },
      err => console.error(err)
    )
  }

  SetNull() {
    this.cliente.PkCliente = 0,
      this.cliente.Nombre = "",
      this.cliente.Apellido = "",
      this.cliente.Telefono = null,
      this.cliente.FkCiudad = null,
      this.cliente.Direccion = null,
      this.cliente.Mail = null,
      this.cliente.Contrasenia = null,
      this.cliente.Activo = null
    this.idProvincia = null;
    this.contraseniaRep = "";
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  exportexcel() {
    this.sharedService.exportexcel("Clientes", this.listCliente);
  }
}
