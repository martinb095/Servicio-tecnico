import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { PresupuestoService } from '../../../services/presupuesto.service';
;
import { DetallePresupuestoService } from '../../../services/detallepresupuesto.service';

import { RepuestoService } from '../../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';

import { TareaService } from '../../../services/tarea.service';
import { Tarea } from 'src/app/models/tarea';
@Component({
  selector: 'app-modificarpresupuesto',
  templateUrl: './modificarpresupuesto.component.html',
  styleUrls: ['./modificarpresupuesto.component.css']
})
export class ModificarpresupuestoComponent implements OnInit {

  pageActualDetalle: number = 1;
  idPresupuesto: number = 1;

  listRepuesto: Repuesto[] = [];
  presupuesto: any = {};
  listDetallePresupuesto: any = {};
  presupuestoEdit: any;
  detallePresupuesto: any = {};

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private presupuestoService: PresupuestoService,
    private detallePresupuestoService: DetallePresupuestoService,
    private repuestoService: RepuestoService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }

    //Obtiene el idorden de la URL
    this.idPresupuesto = +this.route.snapshot.paramMap.get('idpresupuesto');

    this.obtenerPresupuesto();
    this.obtenerDetallePresupuesto();
  }

  obtenerDetallePresupuesto() {
    this.listDetallePresupuesto = {};
    //Trae los datos detalle de la orden
    this.detallePresupuestoService.ObtenerDetallePresupuestoDePresup(this.idPresupuesto).subscribe(
      (res: any) => {
        console.log(res);
        this.listDetallePresupuesto = res;
      },
      err => console.error(err)
    );
  }

  obtenerPresupuesto() {
    this.presupuestoEdit = {};
    //Trae los datos detalle de la orden
    this.presupuestoService.obtenerPresupuesto(this.idPresupuesto).subscribe(
      (res: any) => {
        this.presupuestoEdit = res;
        console.log(this.presupuestoEdit);
      },
      err => console.error(err)
    );
  }

}
