import { Component, OnInit,VERSION } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
//Repuesto
import { Repuesto } from 'src/app/models/repuesto';
import { RepuestoService } from 'src/app/services/repuesto.service';

//Tipo repuesto
import { TipoRepuesto } from 'src/app/models/tiporepuesto';
import { TipoRepuestoService } from 'src/app/services/tiporepuesto.service';

//Repuesto historia
import { RepuestoHist } from 'src/app/models/repuestoHist';
import { RepuestoHistService } from 'src/app/services/repuestoHist.service';

//Marca
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';


import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';

@Component({
  selector: 'app-menurepuesto',
  templateUrl: './menurepuesto.component.html',
  styleUrls: ['./menurepuesto.component.css']
})

export class MenurepuestoComponent implements OnInit {


  repuesto: Repuesto = {
    PkRepuesto: 0,
    Nombre: "",
    PrecioCosto: 0,
    PrecioVenta: 0,
    CantidadStock: 0,
    Observacion: "",
    NroSerie: 0,
    FkTipoRepuesto: 0,
    FkMarca: 0,   
    Activo:null   
  };       

  listRepuesto: Repuesto[] = [];
  listTipoRep: TipoRepuesto[] = [];
  listMarca: Marca[] = [];
  listRepuestoHist: RepuestoHist[] = [];

  idTipoRepuesto: 0;
  idMarca: 0;
  pageActual: number = 1;
  pagRepHist: number = 1;
  pagActRepHist: number = 1;

  //Valor que toma el input de buscar
  repuestoBuscar: string;

  constructor(    
    private http: HttpClient,
    private modalService: ModalService,
    private repuestoService: RepuestoService,
    private tipoRepuestoService: TipoRepuestoService,
    private marcaService: MarcaService,
    private router: Router,
    private repuestoHistService: RepuestoHistService
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerMarca();
    this.ObtenerTipoRepuesto();
    this.ObtenerRepuestos();
  }

  ObtenerRepuestos() {
    this.listRepuesto = [];
    this.repuestoService.ObtenerRepuestos(this.idTipoRepuesto).subscribe(
      (res: any) => {
        this.listRepuesto = res;
      },
      err => console.error(err)
    );
  }

  RepuestoSegunNombre(valor: string) {
    this.listRepuesto = [];
    if (valor != "") {
      this.repuestoService.ObtenerRepPorNombre(valor).subscribe((data: Repuesto[]) => {
        this.listRepuesto = data;
      },
        err => console.error(err)
      );
    } else {
      this.ObtenerRepuestos();
    }
  }

  RepuestoSegunTipo() {
    this.listRepuesto = [];
    this.repuestoService.ObtenerRepuestos(0).subscribe(
      (res: any) => {
        this.listRepuesto = res;
      },
      err => console.error(err)
    );
  }

  EliminarRepuesto(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el repuesto Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        this.repuestoService.EliminarRepuesto(id).subscribe(res => {
          //Recarga los repuestos       
          this.ObtenerRepuestos();
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado             
        Swal.fire({ icon: 'success', title: "Repuesto Nro. " + id + " eliminado correctamente." })

      } 
    })
  }

  ObtenerTipoRepuesto() {
    this.listTipoRep = [];
    this.tipoRepuestoService.ObtenerTipoRepuesto().subscribe(
      (res: any) => {
        this.listTipoRep = res;
        this.idTipoRepuesto = 0;
      },
      err => console.error(err)
    );
  }

  ObtenerMarca() {
    this.listMarca = [];
    this.marcaService.ObtenerMarcas().subscribe(
      (res: any) => {
        this.listMarca = res;
        this.idMarca = 0;
      },
      err => console.error(err)
    );
  }
  GuardarRepuesto() {
    if (this.repuesto.Nombre == "" || this.repuesto.Nombre == null) {
      Swal.fire({ title: "El nombre del repuesto no puede estar vacio.", icon: "warning" });
      return;
    }
    //Almacena repuesto   
    this.repuestoService.GuardarRepuesto(this.repuesto)
      .subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            //Mensaje informando el almacenado
            this.closeModal('ModalNuevoRepuesto');
            Swal.fire({ title: "Repuesto guardado correctamente.", icon: "success" });
            this.ObtenerRepuestos();
          }    
        },
        err => console.error(err)
      )
  }

  //Obtiene el repuesto de la fila y la asigna al objeto que despues actualiza
  SetValores(repuesto: Repuesto) {
    this.repuesto = {
      PkRepuesto: repuesto.PkRepuesto,
      Nombre: repuesto.Nombre,
      PrecioCosto: repuesto.PrecioCosto,
      PrecioVenta: repuesto.PrecioVenta,      
      CantidadStock: repuesto.CantidadStock,
      Observacion: repuesto.Observacion,
      NroSerie: repuesto.NroSerie,
      FkTipoRepuesto: repuesto.FkTipoRepuesto,
      FkMarca: repuesto.FkMarca,     
      Activo: repuesto.Activo,
    };  
  }

  ModificarRepuesto() {
    if (this.repuesto.Nombre == "" || this.repuesto.Nombre == null) {
      Swal.fire({ title: "El nombre del repuesto no puede estar vacio.", icon: "warning" });
      return;
    }  
    //Almacena repuesto   
    this.repuestoService.ActualizarRepuesto(this.repuesto.PkRepuesto, this.repuesto).subscribe(
      res => {       
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoRepuesto');
          Swal.fire({ title: "Repuesto modificado correctamente.", icon: "success" });
          this.ObtenerRepuestos();
        }
      },
      err => console.error(err)
    )
  }

  SetNull() {
    this.repuesto.PkRepuesto= 0,
    this.repuesto.Nombre = "",
    this.repuesto.PrecioCosto = 0,
    this.repuesto.PrecioVenta= 0,
    this.repuesto.CantidadStock= 0,
    this.repuesto.Observacion= "",
    this.repuesto.NroSerie= 0,
    this.repuesto.FkTipoRepuesto= 0,
    this.repuesto.FkMarca= 0,   
    this.repuesto.Activo=true   
  }

  verHistorial(id: number) {
      this.listRepuestoHist = [];
      this.repuestoHistService.obtenerHistorialRep(id).subscribe(
        (res: any) => {
          this.listRepuestoHist = res;      
        },
        err => console.error(err)
      );
    
    this.modalService.open("modalHistorialRep");
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  // uploadImage(files: File[]) {
  //   this.basicUploadImage(files);
  // }

  // basicUploadImage(files: File[]) {
  //   var formData = new FormData();
  //   Array.from(files).forEach((f) => formData.append('file', f));
  //   this.http.post('https://file.io', formData).subscribe((event) => {
 
  //     console.log('done');
  //     console.log(event);
  //   });
  // }
  // fileChange(element){
  //   this.uploadedFiles = element.target.files;
  // }

  // upload(){
  //   let formData = new FormData();
  //   for(var i = 0; i < this.uploadedFiles.length; i++) {
  //       formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
  //   }
  //   this.http.post('/api/upload', formData)
  //   .subscribe((response)=>{
  //     console.log('response receved is ', response);
  //   })
  // }

  
}
