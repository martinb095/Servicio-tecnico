import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menupedido',
  templateUrl: './menupedido.component.html',
  styleUrls: ['./menupedido.component.css']
})
export class MenupedidoComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() { 
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
