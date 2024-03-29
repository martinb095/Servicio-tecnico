import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-menupedido',
  templateUrl: './menupedido.component.html',
  styleUrls: ['./menupedido.component.css']
})
export class MenupedidoComponent implements OnInit {

  pageActual: number = 1;
  listPedido: Pedido[] = [];
  fechaDesde: string = "";
  fechaHasta: string = "";

  constructor(
    private datePipe: DatePipe,
    private modalService: ModalService,
    private router: Router,
    private pedidoService: PedidoService,
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.fechaDesde = this.datePipe.transform(new Date(), 'yyyy-MM-01');
    this.fechaHasta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.ObtenerPedidos();
  }

  ObtenerPedidos() {
    this.listPedido = [];
    this.pedidoService.ObtenerPedidos(this.fechaDesde, this.fechaHasta).subscribe(
      (res: any) => {
        this.listPedido = res;
      },
      err => console.error(err)
    );
  }

  EliminarPedido(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el pedido Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.pedidoService.EliminarPedido(id).subscribe(res => {
          var result = Object.values(res);
          if (result[0] == "OK") {
            this.ObtenerPedidos();
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Pedido nro. " + id + " eliminado correctamente." })
          }
        },
          err => console.error(err)
        );
      }
    })
  }

  procesarPed(idPedido: number) {
    Swal.fire({
      title: '¿Esta seguro que desea procesar el pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, procesar.',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.pedidoService.ProcesarPedido(idPedido).subscribe(res => {
          var rest = Object.values(res);
          if (rest[0] == "OK") {
            //Mensaje informando el eliminado     
            Swal.fire({ icon: 'success', title: "Pedido procesado correctamente." })
            this.ObtenerPedidos();
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
}
