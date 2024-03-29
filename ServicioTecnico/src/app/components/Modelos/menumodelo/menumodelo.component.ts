import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';

import { Modelo } from 'src/app/models/modelo';
import { ModeloService } from 'src/app/services/modelo.service';

//Marca
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';

//Rubro
import { Rubro } from 'src/app/models/rubro';
import { RubroService } from 'src/app/services/rubro.service';

@Component({
  selector: 'app-menumodelo',
  templateUrl: './menumodelo.component.html',
  styleUrls: ['./menumodelo.component.css']
})
export class MenumodeloComponent implements OnInit {

  //-----Modelo----------
  listMarca: Marca[] = [];
  //-----Modelo----------
  listModelo: Modelo[] = [];
  //-----Rubro----------
  listRubro: Rubro[] = [];

  modelo: Modelo = {
    PkModelo: 0,
    Nombre: "",
    Observacion: "",
    FkMarca: null,
    FkRubro: null,
  };

  modeloBuscar: string;
  modPageActual: number = 1;

  constructor(
    private modalService: ModalService,
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private rubroService: RubroService,
    private router: Router
  ) { }


  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerModelo();
    this.ObtenerMarca();
    this.ObtenerRubro();
  }

  ObtenerRubro() {
    this.listRubro = [];
    this.rubroService.ObtenerRubro().subscribe(
      (res: any) => {
        this.listRubro = res;
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

  //------------------------------------
  //Modelo
  //------------------------------------
  ObtenerModelo() {
    this.listModelo = [];
    this.modeloService.ObtenerModelos().subscribe(
      (res: any) => {
        this.listModelo = res;
        console.log(this.listModelo);
      },
      err => console.error(err)
    );
  }

  EliminarModelo(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el modelo nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.modeloService.EliminarModelo(id).subscribe(res => {        
          window.setTimeout(() => this.ObtenerModelo(), 500);
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Modelo nro. " + id + " eliminado correctamente." })

      }
    })
  }
  GuardarModelo() {
    if (this.modelo.Nombre == "" || this.modelo.Nombre == null) {
      Swal.fire({ title: "El nombre del modelo no puede estar vacio.", icon: "warning" });
      return;
    }
    //Almacena modelo   
    this.modeloService.GuardarModelo(this.modelo).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoModelo');
          Swal.fire({ title: "Modelo guardado correctamente.", icon: "success" });
          window.setTimeout(() => this.ObtenerModelo(), 500);
        }
      },
      err => console.error(err)
    )
  }

  ModificarModelo() {
    if (this.modelo.Nombre == "" || this.modelo.Nombre == null) {
      Swal.fire({ title: "El nombre del modelo no puede estar vacio.", icon: "warning" });
      return;
    }
    //Almacena modelo   
    this.modeloService.ActualizarModelo(this.modelo.PkModelo, this.modelo).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          this.closeModal('ModalEditarModelo');
          //Mensaje informando el almacenado
          Swal.fire({ title: "Modelo modificado correctamente.", icon: "success" });
          window.setTimeout(() => this.ObtenerModelo(), 500);
        }
      },
      err => console.error(err)
    )
  }


  SetValores(modelo: Modelo) {
    this.modelo = {
      PkModelo: modelo.PkModelo,
      Nombre: modelo.Nombre,
      Observacion: modelo.Observacion,
      FkMarca: modelo.FkMarca,
      FkRubro: modelo.FkRubro,
    };
  }

  ModeloSegunNombre(valor: string) {
    this.listModelo = [];
    if (valor != "") {
      this.modeloService.ObtenerModeloPorNombre(valor).subscribe((data: Modelo[]) => {
        this.listModelo = data;
      },
        err => console.error(err)
      );
    } else {
      this.ObtenerModelo();
    }
  }

  SetNull() {
    //modelo
    this.modelo.PkModelo = null;
    this.modelo.Nombre = null;
    this.modelo.Observacion = null;
    this.modelo.FkMarca = null;
    this.modelo.FkRubro = null;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
