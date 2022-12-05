import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2'

import { Rubro } from 'src/app/models/rubro';
import { RubroService } from 'src/app/services/rubro.service';
@Component({
  selector: 'app-menurubros',
  templateUrl: './menurubros.component.html',
  styleUrls: ['./menurubros.component.css']
})
export class MenurubrosComponent implements OnInit {

  listRubros: Rubro[] = [];

  rubro: Rubro = {
    PkRubro: 0,
    Nombre: "",
  };

  pageActual: number = 1;

  constructor(
    private modalService: ModalService,
    private rubroService: RubroService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerRubros();
  }

  ObtenerRubros() {
    this.listRubros = [];
    this.rubroService.ObtenerRubro().subscribe(
      (res: any) => {
        this.listRubros = res;
      },
      err => console.error(err)
    );
  }

  SetValores(rubro: Rubro) {
    this.rubro = {
      PkRubro: rubro.PkRubro,
      Nombre: rubro.Nombre,
    };
  }

  SetNull() {
    this.rubro.PkRubro = null;
    this.rubro.Nombre = null;
  }

  GuardarRubro() {
    if (this.rubro.Nombre == "" || this.rubro.Nombre == null) {
      Swal.fire({ title: "El nombre del rubro no puede estar vacio.", icon: "warning" });
      return;
    }
    this.rubroService.GuardarRubro(this.rubro).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoRubro');
          Swal.fire({ title: "Rubro guardado correctamente.", icon: "success" });
          window.setTimeout(() => this.ObtenerRubros(), 500);
        }
      },
      err => console.error(err)
    )
  }

  ModificarRubro() {
    if (this.rubro.Nombre == "" || this.rubro.Nombre == null) {
      Swal.fire({ title: "El nombre del rubro no puede estar vacio.", icon: "warning" });
      return;
    }
    this.rubroService.ActualizarRubro(this.rubro.PkRubro, this.rubro).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalEditarRubro');
          Swal.fire({ title: "Rubro modificado correctamente.", icon: "success" });
          window.setTimeout(() => this.ObtenerRubros(), 500);
        }
      },
      err => console.error(err)
    )

  }

  EliminarRubro(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el rubro Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.rubroService.EliminarRubros(id).subscribe(res => {
          window.setTimeout(() => this.ObtenerRubros(), 500);
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Rubro nro. " + id + " eliminado correctamente." })

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
