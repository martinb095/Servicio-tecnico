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
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-nuevopresupuesto',
  templateUrl: './nuevopresupuesto.component.html',
  styleUrls: ['./nuevopresupuesto.component.css']
})
export class NuevopresupuestoComponent implements OnInit {

  totalPresup: number = 0;
  listTarea: any[] = [];
  pageActualDetalle: number = 1;
  pageActualTarea: number = 1;
  pageActualCliente: number = 1;
  idPresupuesto: number = 1;
  pagDetPres: number = 1;
  listRepuesto: Repuesto[] = [];
  presupuesto: any = {};
  listDetallePresupuesto: any = {};
  presupuestoEdit: any;
  detallePresupuesto: any = {};
  pageActualProv: number = 1;
  listCliente: Cliente[] = [];
  idUltimoPres: number = 1;

  constructor(
    private modalService: ModalService,
    private datePipe: DatePipe,
    private presupuestoService: PresupuestoService,
    private clienteService: ClienteService,
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
    this.presupuesto.FechaCreacion = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.presupuesto.FechaVigencia = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.ObtenerClientes();
  }


  ObtenerClientes() {
    this.listCliente = [];
    this.clienteService.ObtenerClientes().subscribe(
      (res: any) => {
        this.listCliente = res;
      },
      err => console.error(err)
    );
  }

  clienteSeleccionado(cliente: Cliente) {
    this.presupuesto.FkCliente = cliente.PkCliente;
    this.presupuesto.Nombre = cliente.Nombre;
    this.presupuesto.Telefono = cliente.Telefono;
    this.presupuesto.Mail = cliente.Mail;
    this.closeModal('ModalSelectCliente');
  }


  obtenerDetallePresupuesto() {
    this.listDetallePresupuesto = {};
    //Trae los datos detalle de la orden
    this.detallePresupuestoService.ObtenerDetallePresupuestoDePresup(this.idUltimoPres).subscribe(
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

  GuardarPresupuesto() {
    if (this.presupuesto.FkCliente == null || this.presupuesto.FkCliente == 0) {
      Swal.fire({ title: "Debe seleccionar un cliente.", icon: "warning" });
      return;
    }
    if (this.presupuesto.Observacion == null) {
      this.presupuesto.Observacion = "";
    }
    //Almacena datos orden
    this.presupuestoService.GuardarPresupuestos(this.presupuesto).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] != "0") {
          this.idUltimoPres = result[0];
          document.getElementById("btnGuardar").style.display = "none";
          document.getElementById("btnNuevoMov").style.display = "inline-block";
          Swal.fire({ title: "Presupuesto guardado correctamente.", icon: "success" })
        }
      },
      err => console.error(err)
    )
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
    this.detallePresupuesto.FkPresupuesto = this.idUltimoPres;

    if (this.detallePresupuesto.PkDetallePresup != null) {
      this.detallePresupuestoService.ActualizarDetallePresupuesto(this.detallePresupuesto.PkDetallePresup, this.detallePresupuesto).subscribe(
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
            this.obtenerDetallePresupuesto();
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

}
