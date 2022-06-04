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

import { TipoRepuestoService } from '../../../services/tiporepuesto.service';
import { TipoRepuesto } from '../../../models/tiporepuesto';


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
  listTipoRep: TipoRepuesto[] = [];
  listDetalleOrden: DetalleOrden[] = [];

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

  detalleOrden: DetalleOrden = {
    PkDetalleOrden: 0,
    Cantidad: 0,
    FkRepuesto: 0,
    Precio: 0,
    Observacion: "",
    FkTarea: 0,
    FechaCreacion: null,
    FkOrden: 0
  };

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
    private tiporepueService: TipoRepuestoService,
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
    var date = new Date();
    this.ordenRep.FechaInicio = this.datePipe.transform(date, "yyyy-MM-dd");

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

    //Carga los productos
    //this.productoService.ObtenerProductos().subscribe(
    // (res: any) => {
    //  this.listProducto = res;
    //},
    // err => console.error(err)
    //);

    //Carga los estados
    this.estadoService.ObtenerEstado().subscribe(
      (res: any) => {
        this.listEstado = res;
      },
      err => console.error(err)
    );

    //Carga los tipos de repuestos para el agregado
    this.tiporepueService.ObtenerTipoRepuesto().subscribe(
      (res: any) => {
        this.listTipoRep = res;
      },
      err => console.error(err)
    );

    this.marcaService.ObtenerMarcas().subscribe((data: Marca[]) => {
      this.listMarca = data;
    },
      err => console.error(err)
    );
  this.obtenerDetallesOrden(229);
  }
  //------------------------
  //Fin ngOnInit
  //-----------------------

  //lista los detalles de las ordenes de acuerdo al producto
  obtenerDetallesOrden(idOrden: number) {
    idOrden = 229
    this.detalleOrdenService.ObtenerDetalleOrdenDeOR(idOrden).subscribe((data: any[]) => {     
      this.listDetalleOrden = data;
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

  // //lista los modelos de acuerdo al producto
  // onSelectProducto(idProducto: number) {
  //   this.selectedProducto = idProducto;
  //   this.modeloService.ObtenerModelosFiltrados(this.selectedProducto).subscribe((data: Modelo[]) => {
  //     this.listModelo = data;
  //   },
  //     err => console.error(err)
  //   );
  // }

  getTareas(listTarea) {
    // //Vacia variables a utilizar
    // this.listTareaTemp = [];
    // this.listDetalleTareaTemp = [];
    // this.totaltareas = 0
    // //Recorre el listado y va agregando los checkeados 
    // var length = listTarea.length;
    // for (let i = 0; i < length; i++) {
    //   if (listTarea[i].checked) {
    //     //Lista de pantalla
    //     this.listTareaTemp.push(listTarea[i]);
    //     //Agrega el costo de las tareas
    //     this.totaltareas = this.totaltareas + listTarea[i].Costo;

    //     //arma detalletarea
    //     this.detalleTarea = {
    //       'PkDetalleTarea': null,
    //       'FkTarea': listTarea[i].PkTarea,
    //       'Costo': listTarea[i].Costo,
    //       'FkOrdenrep': 0
    //     }
    //     this.listDetalleTareaTemp.push(this.detalleTarea);
    //   }
    // }
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

  getRepuestosChecked(listRepuesto) {
    // //Vacia la lista    
    // this.listRepuestoTemp = [];
    // this.listCantidadTemp = [];
    // this.listDetalleRepTemp = [];
    // //Recorre el listado y va agregando los checkeados 
    // var length = listRepuesto.length;
    // for (let i = 0; i < length; i++) {
    //   if (listRepuesto[i].checked) {
    //     //Lista de pantalla
    //     this.listRepuestoTemp.push(listRepuesto[i]);

    //     //arma detallerepuesto
    //     this.detalleRepuesto = {
    //       'PkDetalleRepuesto': null,
    //       'Cantidad': listRepuesto[i].CantidadActual,
    //       'FkRepuesto': listRepuesto[i].PkRepuesto,
    //       'Precio': listRepuesto[i].PrecioVenta,
    //       'FkOrdenrep': 0,
    //       'Repuesto': null
    //     }

    //     this.listDetalleRepTemp.push(this.detalleRepuesto);

    //   }
    // }
  }

  //Registra orden
  GuardarNuevaOrden() {
    //obtiene el id del cliente y se lo asigna a la orden
    this.ordenRep.FkCliente = this.idCliente;
    //Almacena datos orden
    this.ordenesService.GuardarOrdenRep(this.ordenRep)
      .subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] != "0") {
            this.idUltimaOR = result[0];
            document.getElementById("btnGuardar").style.display = "none";
            Swal.fire({ title: "Orden de reparación guardada.", icon: "success" })
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
    this.idUltimaOR=229;
    this.detalleOrden.FkOrden=this.idUltimaOR;
    this.detalleOrden.FechaCreacion = new Date()

    console.log(this.detalleOrden);
    this.detalleOrdenService.GuardarDetalleOrden(this.detalleOrden)
      .subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.obtenerDetallesOrden(this.idUltimaOR);
            Swal.fire({ title: "Datos guardados cxorrectamente.", icon: "success" })
          }
        },
        err => console.error(err)
      )
  }

  //GuardarRepuesto() {
  //  //Almacena repuesto   
  //  this.repuestoService.GuardarRepuesto(this.repuesto)
  //    .subscribe(
  //      res => {
  //        var ultimoidRep = res;
  //        //Agregar la clave primaria para el listado
  //        this.repuesto.PkRepuesto = Number(ultimoidRep);
  //      },
  //      err => console.error(err)
  //    )
  //  //Despues del guardado se agrega el listado el repuesto
  //  this.listRepuesto.push(this.repuesto);
  //
  //  //Mensaje informando el almacenado
  //  Swal.fire({ title: "Repuesto guardado correctamente.", icon: "success" });
  //}

  // GuardarTarea() {
  //   //Almacena tarea   
  //   this.tareaService.GuardarTarea(this.tarea)
  //     .subscribe(
  //       res => {
  //         var ultimoidTarea = res;
  //         //Agregar la clave primaria para el listado
  //         console.log(ultimoidTarea, "ultimoidTarea");
  //         this.tarea.PkTarea = Number(ultimoidTarea);
  //       },
  //       err => console.error(err)
  //     )
  //   //Despues del guardado se agrega al listado 
  //   this.listTarea.push(this.tarea);

  //   //Mensaje informando el almacenado
  //   Swal.fire({ title: "Tarea guardada correctamente.", icon: "success" });

  // }

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

}
