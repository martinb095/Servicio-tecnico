import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/_modal';

import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';

import { ModeloService } from '../../../services/modelo.service';
import { Modelo } from '../../../models/modelo';

import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

import { TareaService } from '../../../services/tarea.service';
import { Tarea } from 'src/app/models/tarea';

import { OrdenesReparacionService } from '../../../services/ordenesreparacion.service';
import { OrdenReparacion } from 'src/app/models/ordenRep';

import { RepuestoService } from '../../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';

import { DetalleOrdenService } from '../../../services/detalleorden.service';
import { DetalleOrden } from 'src/app/models/detalleorden';


@Component({
  selector: 'app-nueva-orden',
  templateUrl: './nueva-orden.component.html',
  styleUrls: ['./nueva-orden.component.css']
})

export class NuevaOrdenComponent implements OnInit {

  listMarca: Marca[] = [];
  listModelo: Modelo[] = [];
  listEstado: Estado[] = [];

  listTarea: Tarea[] = [];
  listRepuesto: Repuesto[] = [];
  listDetalleOrden: any = {};

  listCantidad: number[] = [1];
  listCantidadTemp: number[] = [];

  cliente: Cliente;

  totaltareas = 0;

  //instancia nuevo objeto para llenar para el posterior guardado
  ordenRep: OrdenReparacion = {
    PkOrdenreparacion: 0,
    FechaInicio: null,
    FecRetiroEstimado: "",
    DescripProblema: "",
    FkModelo: null,
    FkCliente: null,
    FkEstado: 2,
    FkUsuario: null,
    Observacion: ""
  };

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
  };

  tarea: Tarea = {
    PkTarea: 0,
    Nombre: "",
    Costo: null,
    Observacion: "",
  };
  date = new Date();
  idUltimaOR = 0;
  idultimoRep = 0;
  idultimaTarea = 0;
  selectedMarca = 0;
  selectedProducto = 0;
  idCliente = 0;

  pageActualRep: number = 1;
  pageActualTarea: number = 1;
  pageActualDetalle: number = 1;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private clienteService: ClienteService,
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private estadoService: EstadoService,
    private ordenesService: OrdenesReparacionService,
    private tareaService: TareaService,
    private repuestoService: RepuestoService,
    private datePipe: DatePipe,
    private detalleOrdenService: DetalleOrdenService,
    private router: Router
  ) { }


  // $event.target.value le pasa el valor del select
  // el ngmodel no te anda con formcontrol="" porque es un elemento de un formulario; despues lo vas a ver si seguis el curso ahi lo usa
  // pero no se lo pongas al select 

  ngOnInit() {

    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    //Obtiene la fecha actual para el guardado    
    this.ordenRep.FechaInicio = this.datePipe.transform(this.date, "yyyy-MM-dd");

    //Obtiene el idcliente de la URL
    this.idCliente = +this.route.snapshot.paramMap.get('idcliente');
    if (this.idCliente == 0) {
      this.router.navigate(['/login'])
    }

    //Trae los datos del cliente
    this.clienteService.SelectCliente(this.idCliente).subscribe(
      (res: any) => {
        if (res == null) {
          this.router.navigate(['/login'])
        } else {
          this.cliente = res;
        }
      },
      err => console.error(err)
    );

    //Carga los estados
    this.estadoService.ObtenerEstado().subscribe(
      (res: any) => {
        this.listEstado = res;
        this.ordenRep.FkEstado=1;
      },
      err => console.error(err)
    );

    this.marcaService.ObtenerMarcas().subscribe((data: Marca[]) => {
      this.listMarca = data;
    },
      err => console.error(err)
    );

  }
  //------------------------
  //Fin ngOnInit
  //-----------------------

  obtenerDetallesOrden() {
    this.listDetalleOrden = {};
    //Trae los datos detalle de la orden
    this.detalleOrdenService.ObtenerDetalleOrdenDeOR(this.idUltimaOR).subscribe(
      (res: any) => {
        this.listDetalleOrden = res;
        console.log("Lleno");
        console.log(this.listDetalleOrden);
      },
      err => console.error(err)
    );
  }



  //lista los productos de acuedo a la marca
  onSelectMarca(idMarca: number) {
    this.selectedMarca = idMarca;
    this.modeloService.ObtenerModelosFindByMarca(this.selectedMarca).subscribe((data: Modelo[]) => {
      this.listModelo = data;
    },
      err => console.error(err)
    );
  }

  obtenerRepuestos() {
    //Carga los repuestos con stock
    // this.listRepuesto = [];
    this.repuestoService.ObtenerRepuestos(0).subscribe(
      (res: any) => {
        this.listRepuesto = res;
      },
      err => console.error(err)
    );
  }
  repuestoSeleccionado(repuesto: any) {
    this.detalleOrden.FkRepuesto = repuesto.PkRepuesto;
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
    document.getElementById("lblNombreTarea").innerHTML = tarea.Nombre;
    this.closeModal("ModalSelectTarea");
  }

  //Registra orden
  GuardarNuevaOrden() {
    if (this.ordenRep.FecRetiroEstimado == "" || this.ordenRep.FecRetiroEstimado == null) {
      Swal.fire({ title: "Debe seleccionar una fecha estimada de retiro.", icon: "warning" });
      return;
    }   
    if (this.ordenRep.FkModelo == 0 || this.ordenRep.FkModelo == null) {
      Swal.fire({ title: "Debe seleccionar un modelo a reparar.", icon: "warning" });
      return;
    }   
    //obtiene el id del cliente y se lo asigna a la orden
    this.ordenRep.FkCliente = this.idCliente;
    //Almacena datos orden
    this.ordenesService.GuardarOrdenRep(this.ordenRep).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] != "0") {
            this.idUltimaOR = result[0];
            document.getElementById("btnGuardar").style.display = "none";
            document.getElementById("btnNuevoMov").style.display = "inline-block";
            Swal.fire({ title: "Orden de reparación guardada correctamente.", icon: "success" })
          }
        },
        err => console.error(err)
      )
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

    this.detalleOrden.FkOrden = this.idUltimaOR;
    this.detalleOrden.FechaCreacion = this.datePipe.transform(this.date, "yyyy-MM-dd");

    if (this.detalleOrden.PkDetalleOrden != null) {
      this.detalleOrdenService.ActualizarDetalleOrden(this.detalleOrden.PkDetalleOrden, this.detalleOrden).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.closeModal('ModalMov');
            this.obtenerDetallesOrden();
            Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
          }
        },
        err => console.error(err)
      )
    } else {
      this.detalleOrdenService.GuardarDetalleOrden(this.detalleOrden).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.closeModal('ModalMov');
            this.obtenerDetallesOrden();
            Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
          }
        },
        err => console.error(err)
      )
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

  SetNull() {
    this.detalleOrden.PkDetalleOrden = null;
    this.detalleOrden.Cantidad = null;
    this.detalleOrden.FkRepuesto = null;
    this.detalleOrden.Precio = null;
    this.detalleOrden.Observacion = null;
    this.detalleOrden.FkTarea = null;
    this.detalleOrden.FechaCreacion = null;
    this.detalleOrden.FkOrden = null;
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
    this.openModal("ModalMov");
  }

  eliminarDetalleOrden(idDetalleOrden: number) {
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

}
