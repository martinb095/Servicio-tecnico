import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

import { DetallePresupuestoService } from 'src/app/services/detallepresupuesto.service';
import { InformesService } from 'src/app/services/informes.service';
@Component({
  selector: 'app-menupresupuesto',
  templateUrl: './menupresupuesto.component.html',
  styleUrls: ['./menupresupuesto.component.css']
})
export class MenupresupuestoComponent implements OnInit {

  list: any;
  listArray: any[] = [];
  pageActual: number = 1;
  listPresupuesto: Presupuesto[] = [];
  fechaDesde: string = "";
  fechaHasta: string = "";
  aceptado: number = 0;
  confirmado: string = "";

  constructor(
    private datePipe: DatePipe,
    private modalService: ModalService,
    private router: Router,
    private presupuestoService: PresupuestoService,
    private detallePresupuestoService: DetallePresupuestoService,
    private informesService:InformesService
  ) { }

  ngOnInit() {

    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.fechaDesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechaHasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.ObtenerPresupuestos();
  }

  ObtenerPresupuestos() {
    this.listPresupuesto = [];
    this.presupuestoService.ObtenerPresupuestos(this.fechaDesde, this.fechaHasta, this.aceptado).subscribe(
      (res: any) => {
        this.listPresupuesto = res;

      },
      err => console.error(err)
    );
  }

  EliminarPresupuesto(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el presupuesto Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.presupuestoService.EliminarPresupuesto(id).subscribe(res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.ObtenerPresupuestos();
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Presupuesto nro. " + id + " eliminado correctamente." })
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  confirmarPresup(id: number) {
    Swal.fire({
      title: '¿Desea confirmar el presupuesto Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, confirmar.',
      cancelButtonText: 'No, cancelar.'
    }).then((result) => {
      if (result.value) {
        this.presupuestoService.ConfirmarPresupuesto(id).subscribe(res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.ObtenerPresupuestos();
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Presupuesto nro. " + id + " confirmado correctamente." })
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  async createPdf(id: number) {
    this.GetPresup(id);
  }

  GetPresup(nroPresup: number) {
    this.list = [];
    this.presupuestoService.obtenerPresupuesto(nroPresup).subscribe(
      (res: any) => {
        this.list = res;
        console.log(this.list);
        this.list.FechaCreacion = this.datePipe.transform(this.list.FechaCreacion, "dd-MM-yyyy");
        this.list.FechaVigencia = this.datePipe.transform(this.list.FechaVigencia, "dd-MM-yyyy");
        if (this.list.Confirmado == 1) {
          this.confirmado = "Si."
        } else {
          this.confirmado = "No."
        }

        this.GetDetallePresup(nroPresup);

      },
      err => console.error(err)
    );
  }

  GetDetallePresup(nroPresup: number) {
    this.listArray = [];
    //Trae los datos detalle de la orden
    this.informesService.ObtenerDetallePresupuestoDePresup(nroPresup).subscribe(
      (res: any) => {
        this.listArray = res;
        console.log(res);
        this.generarPdf(nroPresup);
      },
      err => console.error(err)
    );
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
        { text: "Presupuesto Nro. " + nroOrden, style: 'header' },
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
                text: "Fecha creación: " + this.list.FechaCreacion + "                                                     Fecha vigencia: " + this.list.FechaVigencia + "",
                alignment: 'left',
                margin: [5, 5]
              },
              {
                text: "Confirmado: " + this.confirmado + "",
                alignment: 'left',
                margin: [5, 5]
              },
              {
                text: "Observacion: " + this.list.Observacion,
                alignment: 'left',
                margin: [5, 5, 5, 15]
              }
            ]
          ],
          columnGap: 30
        },
        this.table(this.listArray, encabezado),
        { canvas: [{ type: 'line', x1: 0, y1: 20, x2: 520, y2: 20, lineWidth: 2 }] },
        { text: "Total del presupuesto: $ " + totalOrden + "  ", alignment: 'right', margin: [5, 5, 5, 5] },
      ],

    }

    pdfMake.createPdf(docDefinition).open();
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

}
