import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2'

import { TipoRepuesto } from 'src/app/models/tiporepuesto';
import { TipoRepuestoService } from 'src/app/services/tiporepuesto.service';

@Component({
  selector: 'app-menutiporepuesto',
  templateUrl: './menutiporepuesto.component.html',
  styleUrls: ['./menutiporepuesto.component.css']
})
export class MenutiporepuestoComponent implements OnInit {

  listTiposRepuestos: TipoRepuesto[] = [];

  tipoRepuesto: TipoRepuesto = {
    PkTipoRepuesto: 0,
    Nombre: "",
  };

  pageActual: number = 1;

  constructor(
    private modalService: ModalService,
    private tiporepuestoService: TipoRepuestoService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerTiposRepuesto();
  }

  ObtenerTiposRepuesto() {
    this.listTiposRepuestos = [];
    this.tiporepuestoService.ObtenerTipoRepuesto().subscribe(
      (res: any) => {
        this.listTiposRepuestos = res;
      },
      err => console.error(err)
    );
  }

  //Obtiene tipo repuestos de la fila y la asigna al objeto que despues actualiza
  SetValores(tiporepuesto: TipoRepuesto) {
    this.tipoRepuesto = {
      PkTipoRepuesto: tiporepuesto.PkTipoRepuesto,
      Nombre: tiporepuesto.Nombre,
    };
  }

  SetNull() {
    this.tipoRepuesto.PkTipoRepuesto = null;
    this.tipoRepuesto.Nombre = null;
  }

  GuardarTipoRepuesto() {
    if (this.tipoRepuesto.Nombre == "" || this.tipoRepuesto.Nombre == null) {
      Swal.fire({ title: "El nombre del tipo no puede estar vacio.", icon: "warning" });
      return;
    }   
    this.tiporepuestoService.GuardarTipoRepuesto(this.tipoRepuesto).subscribe(
      res => {       
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoTipoRep');
          Swal.fire({ title: "Tipo de repuesto guardado correctamente.", icon: "success" });
          this.ObtenerTiposRepuesto();
        }
      },
      err => console.error(err)
    )
  }

  ModificarTipoRepuesto() {
    if (this.tipoRepuesto.Nombre == "" || this.tipoRepuesto.Nombre == null) {
      Swal.fire({ title: "El nombre del tipo no puede estar vacio.", icon: "warning" });
      return;
    }     
    this.tiporepuestoService.ActualizarTipoRepuesto(this.tipoRepuesto.PkTipoRepuesto, this.tipoRepuesto).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalEditarTipoRep');
          Swal.fire({ title: "Tipo repuesto modificado correctamente.", icon: "success" });
          this.ObtenerTiposRepuesto();
        }
      },
      err => console.error(err)
    )

  }

  EliminarTipoRepuesto(id: number) {
    Swal.fire({
      title: '¿Desea eliminar la tarea Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
          this.tiporepuestoService.EliminarTipoRepuesto(id).subscribe(res => {
          this.ObtenerTiposRepuesto();
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Tipo de repuesto nro. " + id + " eliminado correctamente." })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({ title: "Cancelado", icon: "error" });
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