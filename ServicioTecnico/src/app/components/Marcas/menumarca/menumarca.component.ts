import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';

//Tipo repuesto
import { TipoRepuesto } from 'src/app/models/tiporepuesto';
import { TipoRepuestoService } from 'src/app/services/tiporepuesto.service';

import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-menumarca',
  templateUrl: './menumarca.component.html',
  styleUrls: ['./menumarca.component.css']
})

export class MenumarcaComponent implements OnInit {
  listTipoRep: TipoRepuesto[] = [];
  //-----Marca----------
  listMarca: Marca[] = [];
  marca: Marca = {
    PkMarca: 0,
    Nombre: "",
    Observacion: "",
  };
  marcaBuscar: string;
  marPageActual: number = 1;

  constructor(
    private modalService: ModalService,
    private marcaService: MarcaService,
    private tipoRepuestoService: TipoRepuestoService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerMarca();
    this.ObtenerTipoRepuesto();
  }

  ObtenerTipoRepuesto() {
    this.listTipoRep = [];
    this.tipoRepuestoService.ObtenerTipoRepuesto().subscribe(
      (res: any) => {  
        this.listTipoRep = res;
      },
      err => console.error(err)
    );
  }

  ObtenerMarca() {
    this.listMarca = [];
    this.marcaService.ObtenerMarcas().subscribe(
      (res: any) => {
        this.listMarca = res;
      },
      err => console.error(err)
    );
  }

  EliminarMarca(id: number) {
    Swal.fire({
      title: '¿Desea eliminar la marca nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar.',
      cancelButtonText: 'No, cancelar.'
    }).then((result) => {
      if (result.value) {
        this.marcaService.EliminarMarca(id).subscribe(res => {
          console.log(Object.values(res));
          var result = Object.values(res);
          if (result[0] == "OK") {
            //Mensaje informando el almacenado
            Swal.fire({ title: "Marca eliminada correctamente.", icon: "success" });
            this.ObtenerMarca();
          }         
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Marca nro. " + id + " eliminada correctamente." })

      } 
    })
  }
  GuardarMarca() {
    //Almacena marca   
    if (this.marca.Nombre == "" || this.marca.Nombre == null) {
      Swal.fire({ title: "La marca no puede estar vacia.", icon: "warning" });
      return;
    }
    this.marcaService.GuardarMarca(this.marca).subscribe(
      res => {      
        var result = Object.values(res);
        if (result[0] == "OK") {
          this.closeModal('ModalNuevaMarca');
          //Mensaje informando el almacenado
          Swal.fire({ title: "Marca guardada correctamente.", icon: "success" });
          this.ObtenerMarca();
        }
      },
      err => console.error(err)
    )
  }

  ModificarMarca() {
    //Almacena modelo  
    if (this.marca.Nombre == "" || this.marca.Nombre == null) {
      Swal.fire({ title: "La marca no puede estar vacia.", icon: "warning" });
      return;
    } 
    this.marcaService.ActualizarMarca(this.marca.PkMarca, this.marca).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          Swal.fire({ title: "Marca modificada correctamente.", icon: "success" });
          this.ObtenerMarca();
        }
      },
      err => console.error(err)
    )
  }

  MarcaSegunNombre(valor: string) {
    this.listMarca = [];
    if (valor != "") {
      this.marcaService.ObtenerMarcaPorNombre(valor).subscribe((data: Marca[]) => {
        this.listMarca = data;
      },
        err => console.error(err)
      );
    } else {
      this.ObtenerMarca();
    }
  }

  SetValores(marca: Marca) {
    this.marca = {
      PkMarca: marca.PkMarca,
      Nombre: marca.Nombre,
      Observacion: marca.Observacion,      
    };
  }

  SetNull() {
    this.marca.PkMarca = null;
    this.marca.Nombre = null;
    this.marca.Observacion = null;   
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
