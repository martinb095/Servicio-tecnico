import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
  }

  exportexcel(nombre: string, list: any) {
    /* pass here the table id */

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list);

    ///* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, nombre + ".xls");

  }
}
