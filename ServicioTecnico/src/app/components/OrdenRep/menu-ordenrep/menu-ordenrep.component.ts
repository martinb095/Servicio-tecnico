import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ModalService } from 'src/app/_modal';

import { OrdenesReparacionService } from '../../../services/ordenesreparacion.service';
import { OrdenReparacion } from '../../../models/ordenRep';

import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado';

import { ClienteService } from '../../../services/cliente.service'
import { Cliente } from '../../../models/cliente';

import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-menu-ordenrep',
  templateUrl: './menu-ordenrep.component.html',
  styleUrls: ['./menu-ordenrep.component.css']
})

export class MenuOrdenrepComponent implements OnInit {

  DatosMail: any;

  listEstado: any[] = [];

  listOrdenRep: OrdenReparacion[] = [];

  listCliente: Cliente[] = [];

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


  PkOrden = 0;
  idEstado = 2;
  pkCliente = 0;
  idEstadoActual = 2;
  CantidadActual = 0;
  pageActual: number = 1;
  pageActualCliente: number = 1;
  idCambiarEstado: number = 1;

  constructor(
    private ordenesRepService: OrdenesReparacionService,
    private estadoService: EstadoService,
    private mailService: MailService,
    private datePipe: DatePipe,
    private clienteService: ClienteService,
    private router: Router,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != 'true') {
      this.router.navigate(['/login'])
    }

    //Clientes para la seleccion
    this.clienteService.ObtenerClientes().subscribe(
      (res: any) => {
        this.listCliente = res;
      },
      err => console.error(err)
    );

    this.estadoService.ObtenerEstado().subscribe(
      (res: any) => {
        this.listEstado = res;
        this.idEstado = 1;
      },
      err => console.error(err)
    );
    this.OrdenesSegunEstado(1);

  };

  OrdenesSegunEstado(id: number) {
    this.pageActual = 1;
    this.listOrdenRep = [];
    this.ordenesRepService.ObtenerOPporEstado(id).subscribe((data: OrdenReparacion[]) => {      
      this.listOrdenRep = data;
      this.idEstadoActual = id;
    },
      err => console.error(err)
    );
  }

  OrdenesSegunId(id: number) {   
    if(id == null ){
      Swal.fire({ title: "Debe seleccionar un nro. de orden.", icon: "warning" });
      return;
    }
    this.listOrdenRep = [];
    this.ordenesRepService.ObtenerORporNro(id).subscribe((data: OrdenReparacion[]) => {
      this.listOrdenRep = data;
      //cambiar el valor de la fila
      this.idEstadoActual = this.listOrdenRep[0].FkEstado;
    },
      err => console.error(err)
    );
  }

  getCliente(cliente: Cliente) {
    this.cliente = cliente;
    this.closeModal('modalSeleccionarCliente');
  }

  OrdenesSegunClienteEstado(PkCliente: number, FkEstado: number) {
    if (FkEstado > 0 && PkCliente == 0) {
      this.OrdenesSegunEstado(FkEstado);
    } else {
      this.listOrdenRep = [];
      this.ordenesRepService.ObtenerORsegunCliEstado(FkEstado, PkCliente).subscribe((res: any) => {
        this.listOrdenRep = res;
        //cambiar el valor de la fila
        // this.idEstadoActual = this.listOrdenRep[0].FkEstado;
      },
        err => console.error(err)
      );
    }
  }

  EliminarOrden(id: number) {
    this.PkOrden = id
    Swal.fire({
      title: '¿Desea eliminar la orden Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.ordenesRepService.EliminarOrdenRep(this.PkOrden).subscribe(res => {
          console.log(res);
          //Mensaje informando el almacenado     
          Swal.fire({ icon: 'success', title: "Orden de reparación Nro. " + id + " eliminada correctamente." })
        },
          err => console.error(err)
        );
      }
    })
  }

  VaciarCliente() {
    Swal.fire({
      title: '¿Desea quitar el cliente a buscar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, quitar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.cliente = {
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
      }
    })
  }


  openModal(id: string, nroOrden: number) {
    this.idCambiarEstado = nroOrden;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  NotificarCliente() {

    //Datos de la orden para actualizar
    let DatosOrden = {
      'PkOrdenRep': this.idCambiarEstado,
      'FkEstado': this.idEstadoActual,
    }
    Swal.fire({
      title: '¿Desea modificar el estado de la orden?',
      text: 'Se enviara un correo al cliente notificando la modificación.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, modificar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        //Cambia al nuevo estado la orden
        this.ordenesRepService.ActualizarEstadoOrden(this.idCambiarEstado, DatosOrden).subscribe(
          (res: any) => {
            console.log(res);
            var result = Object.values(res);
            if (result[0] = true) {
              this.closeModal('ModalConfirmarEstado');
              //Mensaje informando el almacenado     
              Swal.fire({ title: "Estado actualizado de la orden Nro. " + this.idCambiarEstado, icon: "success" });
              //Obtiene los datos de la orden modificada para el envio del mail
              this.OrdenesSegunEstado(this.idEstadoActual);
              this.idEstado = this.idEstadoActual;
              this.ordenesRepService.SelectOrdenReparaMail(this.idCambiarEstado).subscribe(
                (res: any) => {
                  this.DatosMail = res;
                  //formatea fecha 
                  this.DatosMail.FechaRetiro = this.datePipe.transform(this.DatosMail.FechaRetiro, "dd-MM-yyyy");
                  //Envia en caso de tener mail
                  if (this.DatosMail.Mail != null) {
                    // Envia mail con los datos obtenidos
                    this.mailService.EnviarMail(this.DatosMail).subscribe(
                      (res: any) => {
                        console.log(res);
                      },
                      err => console.error(err)
                    );
                  }
                },
                err => console.error(err)
              );
            }
          },
          err => console.error(err)
        );
      }
    })


  }

}

