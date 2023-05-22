import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2'

import { Tarea } from 'src/app/models/tarea';
import { TareaService } from 'src/app/services/tarea.service';

import { TareaHist } from 'src/app/models/tareaHist';
import { TareaHistService } from 'src/app/services/tareaHist.service';

@Component({
  selector: 'app-menutareas',
  templateUrl: './menutareas.component.html',
  styleUrls: ['./menutareas.component.css']
})
export class MenutareasComponent implements OnInit {

  listTarea: Tarea[] = [];
  listTareaHist: TareaHist[] = [];

  tarea: Tarea = {
    PkTarea: 0,
    Nombre: "",
    Costo: null,
    Observacion: "",
    FechaActualizacion: null,
  };

  pagActTareaHist: number = 1;
  pageActual: number = 1;

  constructor(
    private modalService: ModalService,
    private tareaService: TareaService,
    private TareaHistService: TareaHistService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerTareas();
  }

  ObtenerTareas() {
    this.listTarea = [];
    this.tareaService.ObtenerTareas().subscribe(
      (res: any) => {
        this.listTarea = res;
      },
      err => console.error(err)
    );
  }

  GuardarTarea() {
    if (this.tarea.Nombre == "" || this.tarea.Nombre == null) {
      Swal.fire({ title: "La tarea no puede estar vacia.", icon: "warning" });
      return;
    }

    //Almacena tarea   
    this.tareaService.GuardarTarea(this.tarea).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          this.closeModal('ModalNuevaTarea');
          Swal.fire({ title: "Tarea guardada correctamente.", icon: "success" });
          this.ObtenerTareas();
        }
      },
      err => console.error(err)
    )
  }

  //Obtiene la tarea de la fila y la asigna al objeto que despues actualiza
  SetValores(tarea: Tarea) {
    this.tarea = {
      PkTarea: tarea.PkTarea,
      Nombre: tarea.Nombre,
      Costo: tarea.Costo,
      Observacion: tarea.Observacion,
      FechaActualizacion: tarea.FechaActualizacion,
    };
  }

  SetNull() {
    this.tarea.PkTarea = null;
    this.tarea.Nombre = null;
    this.tarea.Costo = null;
    this.tarea.Observacion = null;
    this.tarea.FechaActualizacion = null;
  }

  ModificarTarea() {
    if (this.tarea.Nombre == "" || this.tarea.Nombre == null) {
      Swal.fire({ title: "La tarea no puede estar vacia.", icon: "warning" });
      return;
    }

    //Almacena tarea   
    this.tareaService.ActualizarTarea(this.tarea.PkTarea, this.tarea).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          this.closeModal('ModalEditarTarea');
          Swal.fire({ title: "Tarea modificada correctamente.", icon: "success" });
          this.ObtenerTareas();
        }
      },
      err => console.error(err)
    )
  }

  EliminarTarea(id: number) {
    Swal.fire({
      title: '¿Desea eliminar la tarea Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.tareaService.EliminarTarea(id).subscribe(res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Tarea Nro. " + id + " eliminada correctamente." })
            this.ObtenerTareas();
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  verHistorial(id: number) {
    this.listTareaHist = [];
    this.TareaHistService.obtenerHistorialTarea(id).subscribe(
      (res: any) => {
        this.listTareaHist = res;
      },
      err => console.error(err)
    );

    this.modalService.open("modalHistTarea");
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
