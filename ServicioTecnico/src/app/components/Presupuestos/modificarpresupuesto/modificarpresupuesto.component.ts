import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { PresupuestoService } from '../../../services/presupuesto.service';;
import { DetallePresupuestoService } from '../../../services/detallepresupuesto.service';
import { RepuestoService } from '../../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';
import { TareaService } from '../../../services/tarea.service';


@Component({
  selector: 'app-modificarpresupuesto',
  templateUrl: './modificarpresupuesto.component.html',
  styleUrls: ['./modificarpresupuesto.component.css']
})
export class ModificarpresupuestoComponent implements OnInit {

  totalPresup: number = 0;

  listTarea: any[] = [];
  listRepuesto: any[] = [];

  idPresupuesto: number = 1;
  pagDetPres: number = 1;

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
    private tareaService: TareaService,
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
        this.listDetallePresupuesto = res;
        this.totalPresup = 0;
        for (let i = 0; i < this.listDetallePresupuesto.length; i++) {
          this.totalPresup += this.listDetallePresupuesto[i].Total;
        }
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
        this.presupuestoEdit.FechaCreacion = this.datePipe.transform(this.presupuestoEdit.FechaCreacion, 'yyyy-MM-dd');
        this.presupuestoEdit.FechaVigencia = this.datePipe.transform(this.presupuestoEdit.FechaVigencia, 'yyyy-MM-dd');
      },
      err => console.error(err)
    );
  }

  ModificarPresupuesto() {

    if (this.datePipe.transform(this.presupuestoEdit.FechaCreacion, 'yyyy-MM-dd') > this.datePipe.transform(this.presupuestoEdit.FechaVigencia, 'yyyy-MM-dd')) {
      Swal.fire({ title: "La fecha vigencia no puede ser menor a la fecha de creacion.", icon: "warning" });
      return;
    }

    this.presupuestoService.ActualizarPresupuestos(this.idPresupuesto, this.presupuestoEdit).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado y redirecciona    
          Swal.fire({ title: "Presupuesto modificado correctamente.", icon: "success" }).then(function () {
            window.location.href = "/menupresupuesto";
          },
            err => console.error(err)
          )
        }
      });
  }

  modificarDetalle(detallePresupuestoMod: any) {
    this.SetNull();
    this.detallePresupuesto.PkDetallePresup = detallePresupuestoMod.PkDetallePresup;
    this.detallePresupuesto.FkRepuesto = detallePresupuestoMod.FkRepuesto;
    this.detallePresupuesto.Observacion = detallePresupuestoMod.Observacion;
    this.detallePresupuesto.Cantidad = detallePresupuestoMod.Cantidad;
    this.detallePresupuesto.Precio = detallePresupuestoMod.Precio;
    this.detallePresupuesto.FkTarea = detallePresupuestoMod.FkTarea;
    this.detallePresupuesto.FkPresupuesto = detallePresupuestoMod.FkPresupuesto;
    this.detallePresupuesto.Costo = detallePresupuestoMod.Costo;
    document.getElementById("lblNombreRepuesto").innerHTML = detallePresupuestoMod.Repuesto;
    document.getElementById("lblNombreTarea").innerHTML = detallePresupuestoMod.Tarea;
    this.openModal("ModalMov");
  }

  SetNull() {
    this.detallePresupuesto.PkDetallePresup = null;
    this.detallePresupuesto.FkRepuesto = null;
    this.detallePresupuesto.Observacion = null;
    this.detallePresupuesto.Cantidad = 1;
    this.detallePresupuesto.Precio = null;
    this.detallePresupuesto.FkTarea = null;
    this.detallePresupuesto.FkPresupuesto = null;
    this.detallePresupuesto.Costo = null;
    document.getElementById("lblNombreRepuesto").innerHTML = "";
    document.getElementById("lblNombreTarea").innerHTML = "";
  }

  tareaSeleccionada(tarea: any) {
    this.detallePresupuesto.FkTarea = tarea.PkTarea;
    this.detallePresupuesto.Costo = tarea.Costo;
    document.getElementById("lblNombreTarea").innerHTML = tarea.Nombre;
    this.closeModal("ModalSelectTarea");
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

  obtenerTareas() {
    //Carga las tareas
    this.listTarea = [];
    this.tareaService.ObtenerTareas().subscribe(
      (res: any) => {
        this.listTarea = res;
      },
      err => console.error(err)
    );
  }

  repuestoSeleccionado(repuesto: any) {
    this.detallePresupuesto.FkRepuesto = repuesto.PkRepuesto;
    this.detallePresupuesto.Precio = repuesto.PrecioVenta;
    document.getElementById("lblNombreRepuesto").innerHTML = repuesto.Nombre;
    this.closeModal("ModalSelectRepuesto");
  }

  GuardarDetallePresupuesto() {
    if (this.detallePresupuesto.FkRepuesto == null) {
      Swal.fire({ title: "Debe seleccionar un repuesto.", icon: "warning" });
      return;
    }
    if (this.detallePresupuesto.FkTarea == null) {
      Swal.fire({ title: "Debe seleccionar una tarea.", icon: "warning" });
      return;
    }
    if (this.detallePresupuesto.Cantidad == null || this.detallePresupuesto.Cantidad == "" || this.detallePresupuesto.Cantidad == "0") {
      Swal.fire({ title: "Debe seleccionar una cantidad valida.", icon: "warning" });
      return;
    }
    if (this.detallePresupuesto.Observacion == null) {
      this.detallePresupuesto.Observacion = "";
    }
    this.detallePresupuesto.FkPresupuesto = this.idPresupuesto;

    if (this.detallePresupuesto.PkDetallePresup != null) {
      this.detallePresupuestoService.ActualizarDetallePresupuesto(this.detallePresupuesto.PkDetallePresup, this.detallePresupuesto).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            window.setTimeout(() => this.obtenerDetallePresupuesto(), 500);
            Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
            this.closeModal('ModalMov');
          }
        });
    } else {
      this.detallePresupuestoService.GuardarDetallePresupuesto(this.detallePresupuesto).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            window.setTimeout(() => this.obtenerDetallePresupuesto(), 500);
            Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
            this.closeModal('ModalMov');
          }
        },
        err => console.error(err)
      )
    }
  }


  eliminarDetallePresupuesto(idDetallePresupuesto: number) {
    Swal.fire({
      title: '¿Desea eliminar el movimiento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.detallePresupuestoService.EliminarDetallePresupuesto(idDetallePresupuesto).subscribe(res => {
          var rest = Object.values(res);
          if (rest[0] == "OK") {
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Eliminado correctamente." })
            window.setTimeout(() => this.obtenerDetallePresupuesto(), 500);            
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  validarTarea() {
    this.tareaService.SelectTarea(this.detallePresupuesto.FkTarea).subscribe(
      (res: any) => {      
        if (res != null) {
          this.detallePresupuesto.FkTarea = res.PkTarea;
          this.detallePresupuesto.Costo = res.Costo;
          document.getElementById("lblNombreTarea").innerHTML = res.Nombre;
        } else {
          Swal.fire({ title: "La tarea ingresada no existe.", icon: "warning" });
          this.detallePresupuesto.FkTarea = null;
          this.detallePresupuesto.Costo = 0;
          document.getElementById("lblNombreTarea").innerHTML = "";
          return;
        }
      },
      err => console.error(err)
    );
  }
  validarRepuesto() {
    this.repuestoService.SelectRepuesto(this.detallePresupuesto.FkRepuesto).subscribe(
      (res: any) => {      
        if (res != null) {       
          this.detallePresupuesto.FkRepuesto = res.PkRepuesto;
          this.detallePresupuesto.Precio = res.PrecioVenta;
          document.getElementById("lblNombreRepuesto").innerHTML = res.Nombre;
        } else {
          Swal.fire({ title: "El repuesto ingresado no existe.", icon: "warning" });
          this.detallePresupuesto.FkRepuesto = null;
          this.detallePresupuesto.Precio = 0;
          document.getElementById("lblNombreRepuesto").innerHTML = "";
          return;
        }
      },
      err => console.error(err)
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
