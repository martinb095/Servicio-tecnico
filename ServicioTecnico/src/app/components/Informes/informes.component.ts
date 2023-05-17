import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ModalService } from 'src/app/_modal';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EstadoService } from '../../services/estado.service';

import { InformesService } from 'src/app/services/informes.service';

import { RepuestoService } from '../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  chart: any = [];

  listRepuesto: Repuesto[] = [];
  list: any[] = [];
  listEstado: any[] = [];
  pageActualRep: number = 1;
  idEstado = 1;
  fechadesde: string;
  fechahasta: string;
  filtro: any = {};
  ran: string;
  repdesde: number = 1;
  rephasta: number = 99999;
  date = new Date();

  constructor(
    private datePipe: DatePipe,
    private repuestoService: RepuestoService,
    private estadoService: EstadoService,
    private modalService: ModalService,
    private informeService: InformesService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.obtenerEstados();
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  mostrarGrafOrdenRep() {
    document.getElementById("grafOrdenRep").style.display = "block";
    document.getElementById("grafRepUti").style.display = "none";
    document.getElementById("grafClientesTop").style.display = "none";
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ObtenerGraficoOrdenRep();
  }

  mostrarRepMasUti() {
    document.getElementById("grafRepUti").style.display = "block";
    document.getElementById("grafOrdenRep").style.display = "none";
    document.getElementById("grafClientesTop").style.display = "none";
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  mostrarCliMasORPresup() {
    document.getElementById("grafClientesTop").style.display = "block";
    document.getElementById("grafOrdenRep").style.display = "none";
    document.getElementById("grafRepUti").style.display = "none";
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ObtenerGraficoClientesTop() {
    this.filtro.FechaDesde = this.fechadesde;
    this.filtro.FechaHasta = this.fechahasta;
    let labels = [];
    let dataCant = [];
    this.informeService.obtenerClientesTop(this.filtro).subscribe(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          labels.push(res[i].FkCliente + " - " + res[i].Nombre);
          dataCant.push(res[i].Cantidad);
        }
        const data = {
          labels: labels,
          datasets: [{
            label: ('Cantidad'),
            data: dataCant,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }]
        };
        this.chart = new Chart('canvasClientesTop', {
          type: 'bar',
          data: data,
        });

      },
      err => console.error(err)
    );

  }

  ObtenerGraficoRepMasUti() {
    this.filtro.FechaDesde = this.fechadesde;
    this.filtro.FechaHasta = this.fechahasta;
    let labels = [];
    let dataCant = [];
    this.informeService.repMasUtilizados(this.filtro).subscribe(
      (res: any) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          labels.push(res[i].FkRepuesto + " - " + res[i].Nombre);
          dataCant.push(res[i].Cantidad);
        }
        const data = {
          labels: labels,
          datasets: [{
            label: ('Cantidad'),
            data: dataCant,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }]
        };
        this.chart = new Chart('canvasRepUti', {
          type: 'bar',
          data: data,
        });

      },
      err => console.error(err)
    );
  }

  ObtenerGraficoOrdenRep() {
    this.filtro.FechaDesde = this.fechadesde;
    this.filtro.FechaHasta = this.fechahasta;
    this.list = [];
    let labels = [];
    let totalCantidad = 0; 
    this.informeService.ordenesRepEstados(this.filtro).subscribe(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          switch (res[i].FkEstado) {
            case 1:
              this.list.splice(0, 0, res[i].Cantidad);
              labels.splice(0, 0, 'Pendiente');
              break;
            case 2:
              this.list.splice(1, 0, res[i].Cantidad);
              labels.splice(1, 0, 'Reparando');
              break;
            case 3:
              this.list.splice(2, 0, res[i].Cantidad);
              labels.splice(2, 0, 'Reparado');
              break;
            case 4:
              this.list.splice(3, 0, res[i].Cantidad);
              labels.splice(3, 0, 'Entregado');
              break;
            case 5:
              this.list.splice(4, 0, res[i].Cantidad);
              labels.splice(4, 0, 'Cancelado');
              break;
            default:
              break;
          }
          totalCantidad += res[i].Cantidad; 
        }
        const porcentajes = this.list.map(cantidad => (cantidad / totalCantidad) * 100);
        const data = {
          labels: labels.map((label, index) => `${label} (${porcentajes[index].toFixed(2)}%)`), 
          datasets: [{
            data: this.list,
            backgroundColor: [
              '#e11a29',
              '#db5252',
              '#6fc6d7',
              '#65af30',
              '#D9E42D'
            ],
            hoverOffset: 4
          }]
        };
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: data,
        });
      },
      err => console.error(err)
    );
  }

  stockDeRepuestos() {
    this.list = [];
    this.filtro.RepDesde = this.repdesde;
    this.filtro.RepHasta = this.rephasta;

    this.informeService.StockRepuestos(this.filtro).subscribe(
      (res: any) => {
        this.list = res[0];
        var encabezado: string[] = ['Nro.', 'Nombre', 'Stock', 'Precio Costo $', 'Precio Venta $'];
        this.createpdfStock(this.list, 'Software Marbal - Stock de repuestos', encabezado);
        this.closeModal('ModalStockRep')
      },
      err => console.error(err)
    );
  }

  ordenesEntreFechas() {
    this.list = [];
    this.filtro.FechaDesde = this.fechadesde;
    this.filtro.FechaHasta = this.fechahasta;
    this.filtro.FkEstado = this.idEstado;
    this.informeService.OrdenesFechas(this.filtro).subscribe(
      (res: any) => {
        var estado: string;
        if (this.idEstado == 1) {
          estado = " pendientes.";
        } else if (this.idEstado == 2) {
          estado = " reparando.";
        } else if (this.idEstado == 3) {
          estado = " reparadas.";
        } else if (this.idEstado == 4) {
          estado = " canceladas.";
        } else if (this.idEstado == 5) {
          estado = " entregadas.";
        } else {
          estado = ".";
        }
        this.list = res[0];
        var encabezado: string[] = ['Nro', 'Fecha Inicio', 'Fecha Retiro', 'Marca', 'Modelo', 'Cliente'];

        this.createpdf(this.list, 'Software Marbal - Ordenes de reparaciones' + estado, encabezado);
        this.closeModal('ModalInfOrden');
      },
      err => console.error(err)
    );

  }

  clientesMasOrdenes() {
    this.list = [];
    this.informeService.ClientesMasOrdenes().subscribe(
      (res: any) => {
        this.list = res;
        var encabezado: string[] = ['Nro', 'Nombre', 'Apellido', 'Teléfono', 'Mail', 'Cantidad'];
        this.createpdf(this.list, 'Software Marbal - Clientes con mas ordenes', encabezado);
      },
      err => console.error(err)
    );
  }

  obtenerRepuestos() {
    //Carga los repuestos con stock
    this.listRepuesto = [];
    this.repuestoService.ObtenerRepuestos(0).subscribe(
      (res: any) => {
        this.listRepuesto = res;
      },
      err => console.error(err)
    );
  }

  obtenerEstados() {
    this.estadoService.ObtenerEstado().subscribe(
      (res: any) => {         
        this.listEstado = res;          
      },
      err => console.error(err)
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  openModalRep(rango: string) {
    this.modalService.open('ModalSelectRepuesto');
    if (rango == "D") {
      this.ran = "D";
    } else {
      this.ran = "H";
    }
  }
  repuestoSeleccionado(repuesto, ran) {
    if (ran == "D") {
      this.repdesde = repuesto.PkRepuesto;
      document.getElementById("lblNombreRepDesde").innerHTML = repuesto.Nombre;
      this.rephasta = repuesto.PkRepuesto;
      document.getElementById("lblNombreRepHasta").innerHTML = repuesto.Nombre;
    } else {
      this.rephasta = repuesto.PkRepuesto;
      document.getElementById("lblNombreRepHasta").innerHTML = repuesto.Nombre;
    }
    this.closeModal('ModalSelectRepuesto');
  }

  closeModal(id: string) {
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.modalService.close(id);
  }

  async createpdfStock(list: any[], titulo: string, encabezado: string[]) {
    var totalC=0;
    var totalV=0;
    var Diferencia=0;    
    for (let index = 0; index < list.length; index++) {
       totalC =+ list[index][3];
       console.log(index);
       console.log(list[0]);
       console.log(list[0][3]);
       console.log(list[index][3]);
    }  


    var dd = {
      styles: {
        header: {
          font: 'Roboto',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [20, 20],
        },
      },   
      footer: function (currentPage, pageCount) {
        return {
            table: {
                widths: '*',
                body: [
                    [
                        { text: "Página " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'normalText', margin: [20, 20, 50, 20], aligment: 'left' }
                    ]
                ]
            },
            layout: 'noBorders'
        };
      },
      content: [
        {
          columns: [
            {
              image: await this.getBase64ImageFromURL("../assets/images/107721_original2Md - peque.png"),
            },
            {
              width: 'auto',
              text: "Fecha emisión: " + this.datePipe.transform(this.date, "dd-MM-yyyy"), alignment: 'right', bold: true,
            }
          ],         
        },
        { text: titulo, style: 'header' },     
        this.tableStoVal(list, encabezado),   
      
        { canvas: [{ type: 'line', x1: 0, y1: 20, x2: 520, y2: 20, lineWidth: 2 }] },
        { text: "Total Costo: $ " + totalC + "  ", alignment: 'right', margin: [5, 2, 65, 5] },       
        { text: "Total Venta: $ " + 50 + "  ", alignment: 'right', margin: [5, 2, 65, 5] },   
        { text: "Total Diferencia: $ " + 50 + "  ", alignment: 'right', margin: [5, 2, 65, 5] },   
      ],     
    }
    pdfMake.createPdf(dd).open();
  }

  tableStoVal(data, columns) {
    return {
      table: {
        widths: ['5%', '49%', '10%', '18%', '18%'],
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      },
      layout: 'headerLineOnly',
    };
  }

  async createpdf(list: any[], titulo: string, encabezado: string[]) {
    var dd = {
      styles: {
        header: {
          font: 'Roboto',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [20, 20],
        },
      },   
      footer: function (currentPage, pageCount) {
        return {
            table: {
                widths: '*',
                body: [
                    [
                        { text: "Página " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'normalText', margin: [20, 20, 50, 20], aligment: 'left' }
                    ]
                ]
            },
            layout: 'noBorders'
        };
      },
      content: [
        {
          columns: [
            {
              image: await this.getBase64ImageFromURL("../assets/images/107721_original2Md - peque.png"),
            },
            {
              width: 'auto',
              text: "Fecha emisión: " + this.datePipe.transform(this.date, "dd-MM-yyyy"), alignment: 'right', bold: true,
            }
          ]
        },

        { text: titulo, style: 'header' },
        this.table(list, encabezado)
      ],
    }
    pdfMake.createPdf(dd).open();
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
