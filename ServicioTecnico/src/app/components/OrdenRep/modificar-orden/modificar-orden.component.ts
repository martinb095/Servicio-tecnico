import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/_modal';

import { OrdenesReparacionService } from '../../../services/ordenesreparacion.service';
import { OrdenReparacion } from 'src/app/models/ordenRep';

import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';

import { ModeloService } from '../../../services/modelo.service';
import { Modelo } from '../../../models/modelo';

import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado';

import { DetalleOrdenService } from '../../../services/detalleorden.service';
import { DetalleOrden } from 'src/app/models/detalleorden';

import { TareaService } from '../../../services/tarea.service';
import { Tarea } from 'src/app/models/tarea';

import { RepuestoService } from '../../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';


@Component({
  selector: 'app-modificar-orden',
  templateUrl: './modificar-orden.component.html',
  styleUrls: ['./modificar-orden.component.css']
})
export class ModificarOrdenComponent implements OnInit {

  listMarca: Marca[] = [];
  listModelo: Modelo[] = [];
  listEstado: Estado[] = [];
  listTarea: any[] = [];
  listRepuesto: Repuesto[] = [];
  listDetOrden: DetalleOrden[] = [];

  totalOrden = 0;
  selectedMarca = 0;
  selectedProducto = 0;
  date = new Date();

  detalleModelo: any;

  //instancia nuevo objeto para llenar para el posterior guardado
  ordenRep: any = {};

  listDetalleOrden: any = {};


  detalleOrden: any = {};

  repuesto: Repuesto = {
    PkRepuesto: 0,
    Nombre: "",
    PrecioCosto: null,
    PrecioVenta: null,
    CantidadStock: null,
    Observacion: null,
    NroSerie: null,
    FkTipoRepuesto: null,
    FkMarca: null,
    Activo: true,
    FechaActualizacion: null,
  };

  tarea: Tarea = {
    PkTarea: 0,
    Nombre: "",
    Costo: null,
    Observacion: "",
    FechaActualizacion: null,
  };


  pageActualDetalle: number = 1;

  constructor(
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private estadoService: EstadoService,
    private ordenesService: OrdenesReparacionService,
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private tareaService: TareaService,
    private repuestoService: RepuestoService,
    private detalleOrdenService: DetalleOrdenService,
    private router: Router,
    private modalService: ModalService
  ) { }


  idOrdeRep = 0;

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }

    //Obtiene el idorden de la URL
    this.idOrdeRep = +this.route.snapshot.paramMap.get('idorden');

    //Carga las tareas
    this.tareaService.ObtenerTareas().subscribe(
      (res: any) => {
        this.listTarea = res;
      },
      err => console.error(err)
    );

    //Carga las marcas
    this.marcaService.ObtenerMarcas().subscribe(
      (res: any) => {
        this.listMarca = res;
      },
      err => console.error(err)
    );

    //Carga los estados
    this.estadoService.ObtenerEstado().subscribe(
      (res: any) => {
        this.listEstado = res;
      },
      err => console.error(err)
    );

    //Trae los datos orden
    this.ordenesService.ObtenerDatosOrdenRep(this.idOrdeRep).subscribe(
      (res: any) => {
        this.ordenRep = res;
        //Transforma la fecha para poder asignarla
        this.ordenRep.FecRetiroEstimado = this.datepipe.transform(this.ordenRep.FecRetiroEstimado, 'yyyy-MM-dd');
        this.ordenRep.FechaInicio = this.datepipe.transform(this.ordenRep.FechaInicio, 'yyyy-MM-dd');
        this.onSelectMarca(this.ordenRep.FkMarca);

        if (this.ordenRep.FkEstado == "5" || this.ordenRep.FkEstado == "4" || this.ordenRep.FkEstado == "3") {
          document.getElementById("btnNuevoMov").style.display = 'none';
        }
      },
      err => console.error(err)
    );

    this.obtenerDetallesOrden();

  }
  //------------------------
  //Fin ngOnInit
  //----------------------

  obtenerDetallesOrden() {
    this.listDetalleOrden = {};
    //Trae los datos detalle de la orden
    this.detalleOrdenService.ObtenerDetalleOrdenDeOR(this.idOrdeRep).subscribe(
      (res: any) => {
        this.listDetalleOrden = res;
        this.totalOrden = 0;
        for (let i = 0; i < this.listDetalleOrden.length; i++) {
          this.totalOrden += this.listDetalleOrden[i].Total;
        }
      },
      err => console.error(err)
    );
  }

  modificarDetalle(detalleOrdenMod: any) {
    this.SetNull();
    this.detalleOrden.PkDetalleOrden = detalleOrdenMod.PkDetalleOrden;
    this.detalleOrden.Cantidad = detalleOrdenMod.Cantidad;
    this.detalleOrden.FkRepuesto = detalleOrdenMod.FkRepuesto;
    document.getElementById("lblNombreRepuesto").innerHTML = detalleOrdenMod.NombreRep;
    this.detalleOrden.Precio = detalleOrdenMod.Precio;
    this.detalleOrden.Observacion = detalleOrdenMod.Observacion;
    this.detalleOrden.FkTarea = detalleOrdenMod.FkTarea;
    document.getElementById("lblNombreTarea").innerHTML = detalleOrdenMod.NombreTarea;
    this.detalleOrden.FechaCreacion = detalleOrdenMod.FechaCreacion;
    this.detalleOrden.FkOrden = detalleOrdenMod.FkOrden;
    this.detalleOrden.Costo = detalleOrdenMod.Costo;
    this.openModal("ModalMov");
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
  repuestoSeleccionado(repuesto: any) {
    this.detalleOrden.FkRepuesto = repuesto.PkRepuesto;
    this.detalleOrden.Precio = repuesto.PrecioVenta;
    document.getElementById("lblNombreRepuesto").innerHTML = repuesto.Nombre;
    this.closeModal("ModalSelectRepuesto");
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
  tareaSeleccionada(tarea: any) {
    this.detalleOrden.FkTarea = tarea.PkTarea;
    this.detalleOrden.Costo = tarea.Costo;
    document.getElementById("lblNombreTarea").innerHTML = tarea.Nombre;
    this.closeModal("ModalSelectTarea");
  }

  //lista los productos de acuerdo a la marca
  onSelectMarca(idMarca: number) {
    this.selectedMarca = idMarca;
    this.modeloService.ObtenerModelosFindByMarca(this.selectedMarca).subscribe((data: Modelo[]) => {
      this.listModelo = data;
    },
      err => console.error(err)
    );
  }

  //Registra todos los datos relacionados con una orden
  ModificarOrden() {
    //Almacena datos orden
    this.ordenesService.ActualizarOrdenRep(this.idOrdeRep, this.ordenRep)
      .subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            //Mensaje informando el almacenado y redirecciona    
            Swal.fire({ title: "Orden de reparación modificada correctamente.", icon: "success" }).then(function () {
              window.location.href = "/menuordenrep";
            },
              err => console.error(err)
            )
          }
        });
  }

  eliminarDetalleOrden(idDetalleOrden: number) {
    if (this.ordenRep.FkEstado == "5" || this.ordenRep.FkEstado == "4" || this.ordenRep.FkEstado == "3") {
      Swal.fire({ icon: 'warning', title: "No se puede eliminar movimientos con la orden en este estado." })
      return;
    }
    Swal.fire({
      title: '¿Desea eliminar el movimiento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.detalleOrdenService.EliminarDetalleOrden(idDetalleOrden).subscribe(res => {
          var rest = Object.values(res);
          if (rest[0] == "OK") {
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Eliminado correctamente." })
            this.obtenerDetallesOrden();
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

  SetNull() {
    this.detalleOrden.PkDetalleOrden = null;
    this.detalleOrden.Cantidad = 1;
    this.detalleOrden.FkRepuesto = null;
    this.detalleOrden.Precio = null;
    this.detalleOrden.Observacion = null;
    this.detalleOrden.FkTarea = null;
    this.detalleOrden.FechaCreacion = null;
    this.detalleOrden.FkOrden = null;
    this.detalleOrden.Costo = null;
    document.getElementById("lblNombreRepuesto").innerHTML = "";
    document.getElementById("lblNombreTarea").innerHTML = "";
  }

  //Registra detalle orden
  GuardarDetalleOrden() {
    if (this.detalleOrden.FkRepuesto == null && this.detalleOrden.FkTarea == null) {
      Swal.fire({ title: "Debe seleccionar al menos un repuesto o tarea.", icon: "warning" });
      return;
    }
    if (this.detalleOrden.Cantidad == null) {
      this.detalleOrden.Cantidad = 0;
    }
    if (this.detalleOrden.Precio == null) {
      this.detalleOrden.Precio = 0;
    }
    if (this.detalleOrden.Observacion == null) {
      this.detalleOrden.Observacion = "";
    }
    if (this.detalleOrden.Costo == null) {
      this.detalleOrden.Costo = 0;
    }
    this.detalleOrden.FkOrden = this.idOrdeRep;
    this.detalleOrden.FechaCreacion = this.datepipe.transform(this.date, "yyyy-MM-dd");

    //if (this.detalleOrden.PkDetalleOrden != null) {
    //  this.detalleOrdenService.ActualizarDetalleOrden(this.detalleOrden.PkDetalleOrden, this.detalleOrden).subscribe(
    //    res => {
    //      var result = Object.values(res);
    //      if (result[0] == "OK") {
    //        this.closeModal('ModalMov');
    //        window.setTimeout(() => this.obtenerDetallesOrden(), 500);
    //        Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
    //      }
    //    },
    //    err => console.error(err)
    //  )
    //} else {
    this.detalleOrdenService.GuardarDetalleOrden(this.detalleOrden).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          this.closeModal('ModalMov');
          window.setTimeout(() => this.obtenerDetallesOrden(), 500);
          Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
        }
      },
      err => console.error(err)
    )
    //}
  }

  validarTarea() {
    this.tareaService.SelectTarea(this.detalleOrden.FkTarea).subscribe(
      (res: any) => {
        if (res != null) {
          this.detalleOrden.FkTarea = res.PkTarea;
          this.detalleOrden.Costo = res.Costo;
          document.getElementById("lblNombreTarea").innerHTML = res.Nombre;
        } else {
          Swal.fire({ title: "La tarea ingresada no existe.", icon: "warning" });
          this.detalleOrden.FkTarea = null;
          this.detalleOrden.Costo = 0;
          document.getElementById("lblNombreTarea").innerHTML = "";
          return;
        }
      },
      err => console.error(err)
    );
  }
  validarRepuesto() {
    this.repuestoService.SelectRepuesto(this.detalleOrden.FkRepuesto).subscribe(
      (res: any) => {
        if (res != null) {
          this.detalleOrden.FkRepuesto = res.PkRepuesto;
          this.detalleOrden.Precio = res.PrecioVenta;
          document.getElementById("lblNombreRepuesto").innerHTML = res.Nombre;
        } else {
          Swal.fire({ title: "El repuesto ingresado no existe.", icon: "warning" });
          this.detalleOrden.FkRepuesto = null;
          this.detalleOrden.Precio = 0;
          document.getElementById("lblNombreRepuesto").innerHTML = "";
          return;
        }
      },
      err => console.error(err)
    );
  }
}
