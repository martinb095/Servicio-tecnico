import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ModalService } from 'src/app/_modal';

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
    private repuestoService: RepuestoService,
    private estadoService: EstadoService,
    private modalService: ModalService,
    private informeService: InformesService,
  ) { }

  ngOnInit() {
    this.obtenerEstados();

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
        console.log(res);
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

  createpdf(list: any[], titulo: string, encabezado: string[]) {
    var dd = {
      content: [
        { text: titulo, style: 'header' },
        this.table(list, encabezado)
      ],
      styles: {
        header: {
          font: 'Roboto',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [20, 20],
        }
      },
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
      }
    };
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
    this.modalService.close(id);
  }
}
