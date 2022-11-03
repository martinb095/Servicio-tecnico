import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ModalService } from 'src/app/_modal';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../models/estado';

import { InformesService } from 'src/app/services/informes.service';

import { RepuestoService } from '../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  time: any[] = [];
  humidity: any[] = [];
  pressure: any[] = [];
  temperature: any[] = [];
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
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ObtenerGraficoOrdenRep();
  }

  mostrarRepMasUti() {
    document.getElementById("grafRepUti").style.display = "block";
    document.getElementById("grafOrdenRep").style.display = "none";
    this.fechadesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechahasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');   
  }

  ObtenerGraficoRepMasUti() {
    this.filtro.FechaDesde = this.fechadesde;
    this.filtro.FechaHasta = this.fechahasta;   
    let labels = [];
    let dataCant = [];
    this.informeService.repMasUtilizados(this.filtro).subscribe(
      (res: any) => {     
        for (let i = 0; i < res.length; i++) {
          labels.push('Repuestos mas utilizados.');
          dataCant.push(res[i].Cantidad );
        }
        const data = {
          labels: labels,
          
          datasets: [{
            label: (res[0].FkRepuesto + " - " + res[0].Nombre),
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
        }
        const data = {
          labels: labels,
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
        var encabezado: string[] = ['Nro.', 'Nombre', 'Stock', 'Precio Costo', 'Precio Venta'];
        this.createpdf(this.list, 'Software Marbal - Stock de repuestos', encabezado);
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
          estado = "pendientes.";
        } else if (this.idEstado == 2) {
          estado = "reparando.";
        } else if (this.idEstado == 3) {
          estado = "reparadas.";
        } else if (this.idEstado == 4) {
          estado = "canceladas.";
        } else if (this.idEstado == 5) {
          estado = "entregadas.";
        }
        this.list = res[0];
        var encabezado: string[] = ['Nro', 'FechaInicio', 'FechaRetiro', 'Marca', 'Modelo', 'Cliente'];

        this.createpdf(this.list, 'Software Marbal - Ordenes de reparaciones ' + estado, encabezado);
        this.closeModal('ModalInfOrden')
      },
      err => console.error(err)
    );

  }

  clientesMasOrdenes() {
    this.list = [];
    this.informeService.ClientesMasOrdenes().subscribe(
      (res: any) => {
        this.list = res;
        var encabezado: string[] = ['Nro', 'Nombre', 'Apellido', 'Telefono', 'Mail', 'Cantidad'];
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
      content: [
        {
          image: await this.getBase64ImageFromURL("../assets/images/107721_original2Md - peque.png")
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
