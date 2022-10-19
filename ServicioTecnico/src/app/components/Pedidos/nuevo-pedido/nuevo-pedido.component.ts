import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

import { DetallePedido } from 'src/app/models/detallePedido';
import { DetallePedidoService } from '../../../services/detallepedido.service';

import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';

import { RepuestoService } from '../../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent implements OnInit {
  date = new Date();

  idUltimoPed: number = 1;
  pageActualProv: number = 1;

  listDetallePedido: any = {};
  detallePedido: any = {};
  listRepuesto: Repuesto[] = [];
  pedido: Pedido = {
    PkPedProv: 0,
    FkProveedor: 0,
    Observacion: "",
    FechaCreacion: ""
  };
  proveedor: Proveedor = {
    PkProveedor: 0,
    Nombre: "",
    Firma: "",
    FkCiudad: 0,
    Telefono: "",
    Mail: "",
    Cuit: "",
    Contacto1: "",
    Contacto2: "",
    Calle: "",
    Numero: 0,
    Piso: 0,
    Depto:  "",
    Activo: null
  };

  listProveedor: Proveedor[] = [];

  constructor(
    private modalService: ModalService,
    private datePipe: DatePipe,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService,
    private proveedorService: ProveedorService,
    private repuestoService: RepuestoService,
    private router: Router
  ) { }

  ngOnInit() {

    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }

    this.ObtenerProveedores();
  }

  ObtenerProveedores() {
    this.listProveedor = [];
    this.proveedorService.ObtenerProveedores().subscribe(
      (res: any) => {
        this.listProveedor = res;
      },
      err => console.error(err)
    );
  }

  modificarDetalle(detallePedidoMod: any) {
    this.SetNull();
    this.detallePedido.PkDetallePedido = detallePedidoMod.PkDetallePedido;
    this.detallePedido.Cantidad = detallePedidoMod.Cantidad;
    this.detallePedido.FkRepuesto = detallePedidoMod.FkRepuesto;
    this.detallePedido.Observacion = detallePedidoMod.Observacion;
    this.detallePedido.FkPedProv = detallePedidoMod.FkPedProv;
    document.getElementById("lblNombreRepuesto").innerHTML = detallePedidoMod.Repuesto;
    this.openModal("ModalMov");
  }

  SetNull() {
    this.detallePedido.PkDetallePedido = null;
    this.detallePedido.Cantidad = 1;
    this.detallePedido.FkRepuesto = null;
    this.detallePedido.Observacion = null;
    this.detallePedido.FkPedProv = null;
  }

  //Registra detalle pedido
  GuardarDetallePedido() {
    if (this.detallePedido.FkRepuesto == null) {
      Swal.fire({ title: "Debe seleccionar un repuesto.", icon: "warning" });
      return;
    }
    if (this.detallePedido.Cantidad == null || this.detallePedido.Cantidad=="") {
      this.detallePedido.Cantidad = 0;
    }
    if (this.detallePedido.Observacion == null) {
      this.detallePedido.Observacion = "";
    }
    this.detallePedido.FkPedProv = this.idUltimoPed;

    if (this.detallePedido.PkDetallePedido != null) {
      this.detallePedidoService.ActualizarDetallePedido(this.detallePedido.PkDetallePedido, this.detallePedido).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.closeModal('ModalMov');
            this.obtenerDetallesPedido();
            Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
          }
        },
        err => console.error(err)
      )
    } else {
      this.detallePedidoService.GuardarDetallePedido(this.detallePedido).subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.closeModal('ModalMov');
            this.obtenerDetallesPedido();
            Swal.fire({ title: "Datos guardados correctamente.", icon: "success" })
          }
        },
        err => console.error(err)
      )
    }
  }

  eliminarDetallePedido(idDetallePedido: number) {
    Swal.fire({
      title: '¿Desea eliminar el movimiento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.detallePedidoService.EliminarDetallePedido(idDetallePedido).subscribe(res => {
          var rest = Object.values(res);
          if (rest[0] == "OK") {
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Eliminado correctamente." })
            this.obtenerDetallesPedido();
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  proveedorSeleccionado(proveedor: Proveedor) {
    this.pedido.FkProveedor = proveedor.PkProveedor;
    this.proveedor.Firma = proveedor.Firma;
    this.proveedor.Telefono = proveedor.Telefono;
    this.proveedor.Mail = proveedor.Mail;
    this.closeModal('ModalSelectProveedor');
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
    this.detallePedido.FkRepuesto = repuesto.PkRepuesto;
    document.getElementById("lblNombreRepuesto").innerHTML = repuesto.Nombre;
    this.closeModal("ModalSelectRepuesto");
  }

  GuardarPedido() {
    if (this.pedido.FkProveedor == null || this.pedido.FkProveedor == 0) {
      Swal.fire({ title: "Debe seleccionar un proveedor.", icon: "warning" });
      return;
    }
    //Obtiene la fecha actual para el guardado    
    this.pedido.FechaCreacion = this.datePipe.transform(this.date, "yyyy-MM-dd");

    //Almacena datos orden
    this.pedidoService.GuardarPedido(this.pedido).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] != "0") {
          this.idUltimoPed = result[0];
          console.log(this.idUltimoPed);
          document.getElementById("btnGuardar").style.display = "none";
          document.getElementById("btnNuevoMov").style.display = "inline-block";
          Swal.fire({ title: "Pedido guardado correctamente.", icon: "success" })
        }
      },
      err => console.error(err)
    )
  }

  obtenerDetallesPedido() {
    this.listDetallePedido = {};
    //Trae los datos detalle de la orden
    this.detallePedidoService.ObtenerDetallePedidoDePed(this.idUltimoPed).subscribe(
      (res: any) => {
        this.listDetallePedido = res;
      },
      err => console.error(err)
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

}
