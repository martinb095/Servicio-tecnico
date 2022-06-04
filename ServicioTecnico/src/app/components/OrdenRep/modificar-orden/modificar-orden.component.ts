import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { OrdenesReparacionService } from '../../../services/ordenesreparacion.service';
import { OrdenReparacion } from 'src/app/models/ordenRep';

import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';

import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';

import { ModeloService } from '../../../services/modelo.service';
import { Modelo } from '../../../models/modelo';

import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado';

import { DetalleTareaService } from '../../../services/detalletarea.service';
import { DetalleTarea } from 'src/app/models/detalletarea';

import { DetalleRepuestoService } from '../../../services/detallerepuesto.service';
import { DetalleRepuesto } from 'src/app/models/detallerepuesto';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

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

  cliente: Cliente;
  modeloOld: Modelo;
  marcaOld: Marca = {
    PkMarca: 0,
    Nombre: "",
    Observacion: "",
  };

  listMarca: Marca[] = [];
  listProducto: Producto[] = [];
  listModelo: Modelo[] = [];

  listEstado: Estado[] = [];

  listTarea: any[] = [];
  listTareaTemp: Tarea[] = [];
  listDetalleTareaTemp: DetalleTarea[] = [];

  listRepuesto: Repuesto[] = [];
  listRepuestoTemp: Repuesto[] = [];
  listDetalleRepTemp: DetalleRepuesto[] = [];

  listDetTareaBd: DetalleTarea[] = [];
  listDetRepBd: DetalleRepuesto[] = [];

  selectedMarca = 0;
  selectedProducto = 0;

  detalleModelo: any;

  //instancia nuevo objeto para llenar para el posterior guardado
  ordenRep: OrdenReparacion = {
    PkOrdenreparacion: 0,
    FechaInicio: null,
    FecRetiroEstimado: null,
    DescripProblema: "",
    FkModelo: null,
    FkCliente: null,
    FkEstado: null,
    FkUsuario: null,
  };

  detalleTarea: DetalleTarea = {
    PkDetalleTarea: 0,
    FkTarea: 0,
    Costo: null,
    FkOrdenrep: 0,
  };

  detalleRepuesto: DetalleRepuesto = {
    PkDetalleRepuesto: 0,
    Cantidad: 0,
    FkRepuesto: 0,
    Precio: 0,
    FkOrdenrep: 0,
    Repuesto: null,
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
    Activo: true,
  };

  tarea: Tarea = {
    PkTarea: 0,
    Nombre: "",
    Costo: null,
    Observacion: ""
  };

  pageActual2: number = 1;
  pageActual: number = 1;
  
  constructor(
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private estadoService: EstadoService,
    private ordenesService: OrdenesReparacionService,
    private marcaService: MarcaService,
    private productoService: ProductoService,
    private modeloService: ModeloService,
    private clientesService: ClienteService,
    private tareaService: TareaService,
    private repuestoService: RepuestoService,
    private detalletareaService: DetalleTareaService,
    private detallerepuestoService: DetalleRepuestoService,
    private router: Router
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

    //Carga los productos
    this.productoService.ObtenerProductos().subscribe(
      (res: any) => {
        this.listProducto = res;
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

    //Carga los repuestos con stock
    this.repuestoService.ObtenerRepuestos(0).subscribe(
      (res: any) => {
        this.listRepuesto = res;
      },
      err => console.error(err)
    );

    this.detalletareaService.ObtenerDetalleTareasDeOR(this.idOrdeRep).subscribe(
      (res: any) => {
        this.listDetTareaBd = res;
        var lengthBD = this.listDetTareaBd.length;
        var length = this.listTarea.length;

        //2 for para obtener el nombre
        for (let iiBD = 0; iiBD < lengthBD; iiBD++) {
          for (let i = 0; i < length; i++) {
            if (this.listDetTareaBd[iiBD].FkTarea == this.listTarea[i].PkTarea) {
              this.tarea = {
                PkTarea: 0,
                Nombre: "",
                Costo: null,
                Observacion: ""
              };

              this.tarea.PkTarea = this.listTarea[i].PkTarea;
              this.tarea.Nombre = this.listTarea[i].Nombre;
              this.tarea.Costo = this.listDetTareaBd[iiBD].Costo;
              //Llena la lista que muestra
              this.listTareaTemp.push(this.tarea);

              //Llena la lista de detalle para el almacenado
              this.detalleTarea = {
                PkDetalleTarea: 0,
                FkOrdenrep: 0,
                FkTarea: 0,
                Costo: 0
              };
              this.detalleTarea.FkOrdenrep = this.idOrdeRep,
                this.detalleTarea.FkTarea = this.listTarea[i].PkTarea,
                this.detalleTarea.Costo = this.listDetTareaBd[iiBD].Costo,
                this.listDetalleTareaTemp.push(this.detalleTarea);
            }
          }
        }
      },
      err => console.error(err)
    );

    this.detallerepuestoService.ObtenerDetalleRepuestosDeOR(this.idOrdeRep).subscribe(
      (res: any) => {
        this.listDetRepBd = res;
        var lengthBD = this.listDetRepBd.length;
        var length = this.listRepuesto.length;

        //2 for para obtener el nombre
        for (let iiBD = 0; iiBD < lengthBD; iiBD++) {
          for (let i = 0; i < length; i++) {
            if (this.listDetRepBd[iiBD].FkRepuesto == this.listRepuesto[i].PkRepuesto) {
              this.repuesto = {
                PkRepuesto: 0,
                Nombre: "",
                PrecioVenta: null,
                PrecioCosto: null,
                CantidadStock: null,
                Observacion: null,
                NroSerie: null,
                Activo: true,
                FkTipoRepuesto: null
              };

              this.repuesto.PkRepuesto = this.listRepuesto[i].PkRepuesto;
              this.repuesto.Nombre = this.listRepuesto[i].Nombre;
              this.repuesto.PrecioVenta = this.listDetRepBd[iiBD].Precio;
              //No es el stock pero lo uso para mostrar la cantidad que se almaceno
              this.repuesto.CantidadStock = this.listDetRepBd[iiBD].Cantidad;
              //Llena la lista que muestra
              this.listRepuestoTemp.push(this.repuesto);

              //Llena la lista de detalle para el almacenado
              this.detalleRepuesto = {
                PkDetalleRepuesto: 0,
                FkOrdenrep: 0,
                FkRepuesto: 0,
                Precio: 0,
                Cantidad: 0,
                Repuesto: null
              };
              this.detalleRepuesto.FkOrdenrep = this.idOrdeRep,
                this.detalleRepuesto.FkRepuesto = this.listRepuesto[i].PkRepuesto,
                this.detalleRepuesto.Precio = this.listDetRepBd[iiBD].Precio;
              this.detalleRepuesto.Cantidad = this.listDetRepBd[iiBD].Cantidad;
              this.listDetalleRepTemp.push(this.detalleRepuesto);
            }
          }
        }
      },
      err => console.error(err)
    );


    //Trae los datos del cliente
    this.ordenesService.SelectOrdenRep(this.idOrdeRep).subscribe(
      (res: any) => {
        this.ordenRep = res;

        //Transforma la fecha para poder asignarla
        this.ordenRep.FecRetiroEstimado = this.datepipe.transform(this.ordenRep.FecRetiroEstimado, 'yyyy-MM-dd');
        this.ordenRep.FechaInicio = this.datepipe.transform(this.ordenRep.FechaInicio, 'yyyy-MM-dd');

        //Trae los datos del cliente 
        this.clientesService.SelectCliente(this.ordenRep.FkCliente).subscribe(
          (res: any) => {
            this.cliente = res;
          });

        this.modeloService.SelectModelo(this.ordenRep.FkModelo).subscribe(
          (res: any) => {
            this.modeloOld = res;

            this.marcaService.SelectMarca(this.modeloOld.FkMarca).subscribe(
              (res: any) => {
                this.marcaOld = res;

              },
              err => console.error(err)
            );

            //Carga los modelos
            this.modeloService.ObtenerModelosFindByMarca(this.modeloOld.FkMarca).subscribe(
              (res: any) => {
                this.listModelo = res;
              },
              err => console.error(err)
            );
          },
          err => console.error(err)
        );
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

  }
  //------------------------
  //Fin ngOnInit
  //----------------------


  //lista los modelos de acuerdo al producto
  onSelectProducto(idProducto: number) {
    this.selectedProducto = idProducto;
    this.marcaService.ObtenerMarcaFiltradas(this.selectedProducto).subscribe((data: Marca[]) => {
      this.listMarca = data;
    },
      err => console.error(err)
    );
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

  getTareas(listTarea) {
    //Vacia la lista    
    this.listTareaTemp = [];
    this.listDetalleTareaTemp = [];
    //Recorre el listado y va agregando los checkeados 
    var length = listTarea.length;
    for (let i = 0; i < length; i++) {
      if (listTarea[i].checked) {
        this.listTareaTemp.push(listTarea[i]);
        //arma detalletarea
        this.detalleTarea = {
          'PkDetalleTarea': null,
          'FkTarea': listTarea[i].PkTarea,
          'Costo': listTarea[i].Costo,
          'FkOrdenrep': this.idOrdeRep,
        }
        this.listDetalleTareaTemp.push(this.detalleTarea);
      }
    }
  }

  getRepuestos(listRepuesto) {
    //Vacia la lista    
    this.listRepuestoTemp = [];
    //Recorre el listado y va agregando los checkeados 
    var length = listRepuesto.length;
    for (let i = 0; i < length; i++) {
      if (listRepuesto[i].checked) {
        this.listRepuestoTemp.push(listRepuesto[i]);
      }
    }
  }

  //Registra todos los datos relacionados con una orden
  ModificarOrden() {

    //Llena el atributo del listado de las tareas de la orden con la tabla de las tareas select
    this.ordenRep.detalleTareas = this.listDetalleTareaTemp;

    //Llena el atributo del listado de los repuestos de la orden con la tabla de los repuestos select
    this.ordenRep.detalleRepuestos = this.listDetalleRepTemp;


    //Almacena datos orden
    this.ordenesService.ActualizarOrdenRep(this.ordenRep.PkOrdenreparacion, this.ordenRep)
      .subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            //Mensaje informando el almacenado y redirecciona    
            Swal.fire({ title: "Orden de reparación Nro. " + this.ordenRep.PkOrdenreparacion + " a sido modificada.", icon: "success" }).then(function () {
              window.location.href = "/menuordenrep";
            },
              err => console.error(err)
            )
          }
        });
  }


  GuardarRepuesto() {
    //Almacena repuesto   
    this.repuestoService.GuardarRepuesto(this.repuesto)
      .subscribe(
        res => {
        },
        err => console.error(err)
      )
    //Despues del guardado se agrega el listado el repuesto
    this.listRepuesto.push(this.repuesto);

    //Mensaje informando el almacenado
    Swal.fire({ title: "Repuesto guardado correctamente.", icon: "success" });

  }

  GuardarTarea() {
    //Almacena repuesto   
    this.tareaService.GuardarTarea(this.tarea)
      .subscribe(
        res => {
        },
        err => console.error(err)
      )
    //Despues del guardado se agrega al listado 
    this.listTarea.push(this.tarea);

    //Mensaje informando el almacenado
    Swal.fire({ title: "Tarea guardada correctamente.", icon: "success" });

  }


}
