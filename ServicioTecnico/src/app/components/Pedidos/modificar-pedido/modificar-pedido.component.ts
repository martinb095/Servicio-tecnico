import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

import { DetallePedido } from 'src/app/models/detallePedido';
import { DetallePedidoService } from '../../../services/detallepedido.service';

import { RepuestoService } from '../../../services/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';

@Component({
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.component.html',
  styleUrls: ['./modificar-pedido.component.css']
})
export class ModificarPedidoComponent implements OnInit {

  pageActualDetalle: number = 1;
  idPedido: number = 1;

  listRepuesto: Repuesto[] = [];
  pedido: any = {};
  listDetallePedido: any = {};
  pedidoEdit: any;
  detallePedido: any = {};

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService,
    private repuestoService: RepuestoService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }

    //Obtiene el idorden de la URL
    this.idPedido = +this.route.snapshot.paramMap.get('idpedido');

    this.obtenerPedido();
    this.obtenerDetallesPedido();
  }

  obtenerDetallesPedido() {
    this.listDetallePedido = {};
    //Trae los datos detalle de la orden
    this.detallePedidoService.ObtenerDetallePedidoDePed(this.idPedido).subscribe(
      (res: any) => {
        this.listDetallePedido = res;
      },
      err => console.error(err)
    );
  }

  obtenerPedido() {
    this.pedidoEdit = {};
    //Trae los datos detalle de la orden
    this.pedidoService.obtenerPedido(this.idPedido).subscribe(
      (res: any) => {
        this.pedidoEdit = res;
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
    this.detallePedido.Cantidad = null;
    this.detallePedido.FkRepuesto = null;
    this.detallePedido.Observacion = null;
    this.detallePedido.FkPedProv = null;
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


 
  ModificarPedido() {
    //Almacena datos orden
    this.pedidoService.ActualizarPedido(this.idPedido, this.pedidoEdit)
      .subscribe(
        res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            //Mensaje informando el almacenado y redirecciona    
            Swal.fire({ title: "Pedido modificado correctamente.", icon: "success" }).then(function () {
              window.location.href = "/menupedido";
            },
              err => console.error(err)
            )
          }
        });
  }

  //Registra detalle pedido
  GuardarDetallePedido() {
    if (this.detallePedido.FkRepuesto == null) {
      Swal.fire({ title: "Debe seleccionar un repuesto.", icon: "warning" });
      return;
    }
    if (this.detallePedido.Cantidad == null) {
      this.detallePedido.Cantidad = 0;
    }
    if (this.detallePedido.Observacion == null) {
      this.detallePedido.Observacion = "";
    }
    this.detallePedido.FkPedProv = this.idPedido;

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

  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
