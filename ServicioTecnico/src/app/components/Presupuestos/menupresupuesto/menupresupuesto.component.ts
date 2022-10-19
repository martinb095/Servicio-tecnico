import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-menupresupuesto',
  templateUrl: './menupresupuesto.component.html',
  styleUrls: ['./menupresupuesto.component.css']
})
export class MenupresupuestoComponent implements OnInit {

  pageActual: number = 1;
  listPresupuesto: Presupuesto[] = [];
  fechaDesde: string = "";
  fechaHasta: string = "";
  aceptado: number = 0;

  constructor(
    private datePipe: DatePipe,
    private modalService: ModalService,
    private router: Router,
    private presupuestoService: PresupuestoService, ) { }

  ngOnInit() {

    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.fechaDesde = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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

}
