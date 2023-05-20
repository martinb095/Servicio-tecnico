import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ModalService } from 'src/app/_modal';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { OrdenesReparacionService } from '../../../services/ordenesreparacion.service';
import { OrdenReparacion } from '../../../models/ordenRep';

import { DetalleOrdenService } from '../../../services/detalleorden.service';

import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado';
import { EstadoHis } from '../../../models/estadohis';

import { ClienteService } from '../../../services/cliente.service'
import { Cliente } from '../../../models/cliente';

import { InformesService } from '../../../services/informes.service'
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-menu-ordenrep',
  templateUrl: './menu-ordenrep.component.html',
  styleUrls: ['./menu-ordenrep.component.css']
})

export class MenuOrdenrepComponent implements OnInit {

  DatosMail: any;
  DatosWsp: any;

  list: any;
  listArray: any[] = [];

  listEstado: any[] = [];
  listEstadoPosible: any[] = [];

  listOrdenRep: OrdenReparacion[] = [];

  listCliente: Cliente[] = [];

  cliente: Cliente = {
    PkCliente: 0,
    Nombre: "",
    Apellido: "",
    Telefono: null,
    FkCiudad: null,
    Calle: null,
    Numero: 0,
    Piso: 0,
    Depto: null,
    Mail: null,
    Contrasenia: null,
    Activo: null
  };

  listEstadoHis: EstadoHis[] = [];

  estadoHis: EstadoHis = {
    PkEstadoHis: 0,
    Observacion: "",
    FkOrdenRep: 0,
    FkEstado: 0,
    Fecha: ""
  };


  PkOrden = 0;
  idEstado = 2;
  pkCliente = 0;
  idEstadoActual: number = 2;
  idEstadoPosible: number = 2;
  cliTel = "";
  estadoWsp = "";
  CantidadActual = 0;
  pageActual: number = 1;
  pageActualCliente: number = 1;
  idCambiarEstado: number = 1;
  observacion = "";

  constructor(
    private ordenesRepService: OrdenesReparacionService,
    private estadoService: EstadoService,
    private mailService: MailService,
    private datePipe: DatePipe,
    private clienteService: ClienteService,
    private router: Router,
    private modalService: ModalService,
    private detalleOrdenService: DetalleOrdenService,
    private informenService: InformesService
  ) { }

  ngOnInit() {

    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != 'true') {
      this.router.navigate(['/login'])
    }

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
    if (id == null) {
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
          Calle: null,
          Numero: 0,
          Piso: 0,
          Depto: null,
          Mail: null,
          Contrasenia: null,
          Activo: null
        };
      }
    })
  }

  estadosPosibles() {
    this.listEstadoPosible = [];   
    //this.idEstadoPosible = 2;
    if (this.idEstadoActual != 5) {
      this.listEstadoPosible.push(this.listEstado[this.idEstadoActual]);
    }
    if (this.idEstadoActual == 1) {
      this.listEstadoPosible.push(this.listEstado[4]);
    }  
    this.idEstadoPosible = Number(this.idEstadoActual) + Number(1);     
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  openModalEstados(id: string, orden: any) {
    if (orden.FkEstado == 4 || orden.FkEstado == 5) {
      Swal.fire({ title: "No puede cambiar el estado.", icon: "warning" });
      return;
    }
    this.idCambiarEstado = orden.Pkordenreparacion;
    this.cliTel = orden.CliTel;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  NotificarCliente() {
    let enviarMail = document.getElementById("cbEnviarMail") as HTMLInputElement;
    let enviarWsp = document.getElementById("cbEnviarWsp") as HTMLInputElement;
    let DatosCambioEstado = {
      'PkOrdenRep': this.idCambiarEstado,
      'FkEstado': this.idEstadoPosible,
      'Observacion': this.observacion,
    }
    Swal.fire({
      title: '¿Desea modificar el estado de la orden?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, modificar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        //Cambia al nuevo estado la orden
        this.ordenesRepService.ActualizarEstadoOrden(DatosCambioEstado).subscribe(
          (res: any) => {
            var result = Object.values(res);
            if (result[0] = true) {
              this.closeModal('ModalConfirmarEstado');
              //Mensaje informando el almacenado     
              Swal.fire({ title: "Estado actualizado de la orden Nro. " + this.idCambiarEstado, icon: "success" });
              //Obtiene los datos de la orden modificada para el envio del mail              
              window.setTimeout(() => this.OrdenesSegunEstado(this.idEstadoActual), 500);
              this.idEstado = this.idEstadoActual;
              if (enviarWsp.checked) {
                this.enviarWsp();
              }
              this.ordenesRepService.SelectOrdenReparaMail(this.idCambiarEstado).subscribe(
                (res: any) => {
                  this.DatosMail = res;
                  //formatea fecha 
                  this.DatosMail.FechaRetiro = this.datePipe.transform(this.DatosMail.FechaRetiro, "dd-MM-yyyy");
                  //Envia en caso de tener mail
                  if (this.DatosMail.Mail != null && enviarMail.checked) {
                    // Envia mail con los datos obtenidos
                    this.enviarMail();
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

  enviarMail() {
    // Envia mail con los datos obtenidos
    this.mailService.EnviarMail(this.DatosMail).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => console.error(err)
    );
  }

  enviarWsp() {
    this.estadoWsp = "";
    this.estadoSegunId();
    //Datos de la orden para actualizar
    let DatosWsp = {
      'Nro': this.cliTel,
      'Mensaje': "El estado de su orden de reparación cambio a " + this.estadoWsp,
    }
    this.mailService.EnviarWsp(DatosWsp).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => console.error(err)
    );
  }

  estadoSegunId() {
    //Define valor de la progress bar
    if (this.idEstadoActual == 1) {
      this.estadoWsp = "pendiente.";
    }
    else if (this.idEstadoActual == 2) {
      this.estadoWsp = "reparando.";
    }
    else if (this.idEstadoActual == 3) {
      this.estadoWsp = "reparado.";
    }
    else if (this.idEstadoActual == 4) {
      this.estadoWsp = "entregado.";
    }
    else if (this.idEstadoActual == 5) {
      this.estadoWsp = "cancelado.";
    }
  }

  async createPdf(id: number) {
    this.GetDetalleOrden(id);
  }

  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach(function (row) {
      var dataRow = [];
      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })
      body.push(dataRow);
    });
    return body;
  }

  table(data, columns) {
    return {
      table: {
        widths: ['29%', '10%', '29%', '11%', '11%', '10%'],
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      },
      layout: 'headerLineOnly',
    };
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = 50;
        canvas.height = 45;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }


  async generarPdf(nroOrden: number) {
    var encabezado: string[] = ['Tarea', 'Costo $', 'Repuesto', 'Precio $', 'Cantidad', 'Total $'];
    var totalOrden = 0;
    for (var i = 0; i < this.listArray.length; i++) {
      totalOrden += this.listArray[i]['Total $'];
    }

    let docDefinition = {
      styles: {
        header: {
          font: 'Roboto',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [20, 20],
        },
      },
      footer: (currentPage: number, pageCount: number) => {
        return [{
          margin: [20, 20, 20, 20],
          text: 'Página ' + currentPage + ' de ' + pageCount,
          alignment: 'right'
        }
        ];
      },
      content: [
        {
          image: await this.getBase64ImageFromURL("../assets/images/107721_original2Md - peque.png")
        },
        { text: "Orden de reparación Nro. " + nroOrden, style: 'header' },
        {
          columns: [
            [
              {
                text: "Cliente: " + this.list.Nombre + "  -  Mail: " + this.list.Mail + "  -  Teléfono: " + this.list.Telefono,
                heights: 160,
                alignment: 'left',
                margin: [5, 5]
              },
              {
                text: "Fecha inicio: " + this.list.FechaInicio + "                                                     Fecha retiro estimado: " + this.list.FecRetiroEstimado + "",
                alignment: 'left',
                margin: [5, 5]
              },
              {
                text: "Estado: " + this.list.Estado + "",
                alignment: 'left',
                margin: [5, 5]
              },
              {
                text: "Dispositivo Marca: " + this.list.Marca + " - " + this.list.Modelo + " - ",
                alignment: 'left',
                margin: [5, 5, 5, 15]
              }
            ]
          ],
          columnGap: 30
        },
        this.table(this.listArray, encabezado),
        { canvas: [{ type: 'line', x1: 0, y1: 20, x2: 520, y2: 20, lineWidth: 2 }] },
        { text: "Total de la orden: $ " + totalOrden + "  ", alignment: 'right', margin: [5, 5, 5, 5] },
      ],

    }

    pdfMake.createPdf(docDefinition).open();
  }

  GetDetalleOrden(nroOrden: number) {
    this.list = [];
    this.informenService.ObtenerDatosOrdenRep(nroOrden).subscribe(
      (res: any) => {
        this.list = res;
        this.list.FechaInicio = this.datePipe.transform(this.list.FechaInicio, "dd-MM-yyyy");
        this.list.FecRetiroEstimado = this.datePipe.transform(this.list.FecRetiroEstimado, "dd-MM-yyyy");
        this.GetDetalleRepOrden(nroOrden);

      },
      err => console.error(err)
    );
  }

  GetDetalleRepOrden(nroOrden: number) {
    this.listArray = [];
    //Trae los datos detalle de la orden
    this.informenService.ObtenerDetalleOrdenDeOR(nroOrden).subscribe(
      (res: any) => {
        this.listArray = res;
        this.generarPdf(nroOrden);
      },
      err => console.error(err)
    );
  }

  mostrarHistorial(nroOrden: number) {
    // //Trae los datos detalle de la orden
    this.estadoService.obtenerEstadosHis(nroOrden).subscribe(
      (res: any) => {
        this.listEstadoHis = res;

        this.openModal("modalHistorialEstados");
      },
      err => console.error(err)
    );

  }

  controlVencimiento(fechaRetiro: any, estado: number): boolean {
    let date = new Date();
    //if (this.datePipe.transform(fechaRetiro, "yyyy-MM-dd") < this.datePipe.transform(date, "yyyy-MM-dd") && estado == 1) {
    if (this.datePipe.transform(fechaRetiro, "yyyy-MM-dd") < this.datePipe.transform(date, "yyyy-MM-dd")) {
      return true;
    } else {
      return false;
    }
  }

}

