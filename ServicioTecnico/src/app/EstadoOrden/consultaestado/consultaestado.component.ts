import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { OrdenesReparacionService } from '../../services/ordenesreparacion.service';


@Component({
  selector: 'app-consultaestado',
  templateUrl: './consultaestado.component.html',
  styleUrls: ['./consultaestado.component.css']
})
export class ConsultaestadoComponent implements OnInit {

  tel = '[5493537665239]';
  mensaje = 'Hola, queria hacer una consulta.';

  datosOrden: any = {
    PkOrdenRep: "",
    Mail: "",
    Contrasenia: "",
  };

  constructor(
    private ordenesreparacionService: OrdenesReparacionService,
    private router: Router) { }

  ngOnInit() {
  }

  ValidarExistenciaOrden() {
    if (this.datosOrden.PkOrdenRep == "" || this.datosOrden.PkOrdenRep == null) {
      Swal.fire({ title: "El nro. de orden no puede estar vacio.", icon: "warning" });
      return;
    }
    if (this.datosOrden.Mail == "" || this.datosOrden.Mail == null) {
      Swal.fire({ title: "El mail no puede estar vacio.", icon: "warning" });
      return;
    }
    if (this.datosOrden.Contrasenia == "" || this.datosOrden.Contrasenia == null) {
      Swal.fire({ title: "La contraseña no puede estar vacia.", icon: "warning" });
      return;
    }

    //valida datos de la orden
    this.ordenesreparacionService.ValidarOrdenRep(this.datosOrden).subscribe(
      (res: any) => {
        var valido = res.exist;
        if (valido == true) {
          localStorage.setItem('ingresoDetalle', 'true');
          this.router.navigate(["/detalleestadoorden", this.datosOrden.PkOrdenRep])
        }
        else {
          Swal.fire({ title: "Los datos ingresados no son validos.", icon: "warning" })
        }
      },
      err => console.error(err)
    );
  }


}
