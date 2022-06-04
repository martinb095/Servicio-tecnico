import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { OrdenesReparacionService } from '../../../services/ordenesreparacion.service';
import { OrdenReparacion } from '../../../models/ordenRep';

import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado';

import { TareaService } from '../../../services/tarea.service';
import { Tarea } from 'src/app/models/tarea';

import { DetalleOrdenService } from 'src/app/services/detalleorden.service';
import { DetalleOrden } from 'src/app/models/detalleorden';

import { Repuesto } from 'src/app/models/repuesto';
import { RepuestoService } from 'src/app/services/repuesto.service';



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

  listEstado: Estado[] = [];

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
    Activo:null
  };

  listTarea: Tarea[] = [];
  listTareaTemp: Tarea[] = [];


  listRepuesto: any[] = [];
  listRepuestoTemp: Repuesto[] = [];
  detalleorden: DetalleOrden;

  PkOrden = 0;
  idEstado = 2;
  pkCliente = 0;
  idEstadoActual = 2;
  CantidadActual = 0;
  pageActual: number = 1;

  constructor(
    private ordenesRepService: OrdenesReparacionService,
    private estadoService: EstadoService,
    private tareasService: TareaService,    
    private repuestoService: RepuestoService,
    private mailService: MailService,
    private datePipe: DatePipe,
    private detalleordenService: DetalleOrdenService,
    private clienteService: ClienteService,   
    private router: Router
  ) { }

  ngOnInit() {   
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');    
    if(valido != 'true'){
     this.router.navigate(['/login'])      
    }

    //repuesto para el agregado
    this.repuestoService.ObtenerRepuestos(0).subscribe(
      (res: any) => {
        this.listRepuesto = res;
      },
      err => console.error(err)
    );


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
      },
      err => console.error(err)
    );
    this.OrdenesSegunEstado(this.idEstado);

  };

  OrdenesSegunEstado(id: number) {
    this.listOrdenRep = [];
    this.ordenesRepService.ObtenerOPporEstado(id).subscribe((data: OrdenReparacion[]) => { 
      this.listOrdenRep = data;     
      this.idEstadoActual = id;
    },
      err => console.error(err)
    );
  }

  OrdenesSegunId(id: number) {
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
        //Mensaje informando el almacenado     
        Swal.fire({ icon: 'success', title: "Orden de reparación Nro. " + id + " eliminada correctamente.", })
        this.ordenesRepService.EliminarOrdenRep(this.PkOrden).subscribe(res => {
          //    console.log(res)
        },
          err => console.error(err)
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({ title: "Cancelado", icon: "error" });
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
          Activo:null
        };
      }
    })
  }

  TareasSinAsignar(idOrden: number) {
    this.PkOrden = idOrden
    this.listTarea = [];
    this.tareasService.SelectTareaSinAsignar(idOrden).subscribe((data: Tarea[]) => {
      this.listTarea = data;
    },
      err => console.error(err)
    );
  }

  // RepuestoSinAsignar(idOrden: number) {
  //   this.PkOrden = idOrden
  //   this.listRepuesto = [];
  //   this.repuestoService.SelectRepuestoSinAsignar(idOrden).subscribe((data: Repuesto[]) => {
  //     this.listRepuesto = data;
  //   },
  //     err => console.error(err)
  //   );
  // }

  // AgregarRepuesto(listRepuesto) {
  //   // console.log(listRepuesto[0].CantidadActual, "CantidadActual")
  //   var length = listRepuesto.length;
  //   for (let i = 0; i < length; i++) {
  //     if (listRepuesto[i].checked) {
  //       //arma detallerepuesto
  //       this.detallerepuesto = {
  //         'PkDetalleRepuesto': null,
  //         'FkRepuesto': listRepuesto[i].PkRepuesto,
  //         'Precio': listRepuesto[i].PrecioVenta,
  //         'Cantidad': listRepuesto[i].CantidadActual,
  //         'FkOrdenrep': this.PkOrden,
  //         'Repuesto': null,
  //       }

  //       //   console.log(this.detallerepuesto, "    this.detallerepuesto");
  //       //Almacena datos orden
  //       this.detallerepuestoService.GuardarDetalleRepuesto(this.detallerepuesto)
  //         .subscribe(
  //           res => {
  //           },
  //           err => console.error(err)
  //         )
  //     }
  //   }
    //Mensaje informando el almacenado     
   // Swal.fire({ title: "Repuesto agregado a la orden Nro. " + this.PkOrden, icon: "success" });
  //}

  NotificarCliente(idOrden: number) {

    //Datos de la orden para actualizar
    let DatosOrden = {
      'PkOrdenRep': idOrden,
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
        //Mensaje informando el almacenado     
        Swal.fire({ title: "Estado actualizado de la orden Nro. " + idOrden, icon: "success" });

        //Cambia al nuevo estado la orden
        this.ordenesRepService.ActualizarEstadoOrden(idOrden, DatosOrden).subscribe(
          (res: any) => {
            //Obtiene los datos de la orden modificada para el envio del mail
            this.ordenesRepService.SelectOrdenReparaMail(idOrden).subscribe(
              (res: any) => {
                this.DatosMail = res;
                //formatea fecha 
                this.DatosMail.FechaRetiro = this.datePipe.transform(this.DatosMail.FechaRetiro, "dd-MM-yyyy");

                //Envia en caso de tener mail
                if (this.DatosMail.Mail != null) {
                  // Envia mail con los datos obtenidos
                  this.mailService.EnviarMail(this.DatosMail).subscribe(
                    (res: any) => {

                    },
                    err => console.error(err)
                  );
                }
              },
              err => console.error(err)
            );
          },
          err => console.error(err)
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({ title: "Cancelado", icon: "error" });
      }
    })

    // this.idEstado = this.idEstadoActual


  }
























}





