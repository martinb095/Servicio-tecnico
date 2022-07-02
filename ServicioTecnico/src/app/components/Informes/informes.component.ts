import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { InformesService } from 'src/app/services/informes.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  list: any[] = [];

  constructor(
    private informeService: InformesService,
  ) { }

  ngOnInit() {

  }

  clientesMasOrdenes() {
    this.list = [];
    this.informeService.ClientesMasOrdenes().subscribe(
      (res: any) => {
        console.log(res);
        this.list = Object.getOwnPropertyNames(res);       
        var encabezado: string[] = ['Apellido', 'Cantidad', 'FkCliente', 'Mail', 'Nombre', 'Teléfono'];
        this.createpdf(this.list, 'Software Marbal - Clientes con mas ordenes', encabezado)
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
          margin: [20,20],
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

}
