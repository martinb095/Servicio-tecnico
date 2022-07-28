import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { OrdenesReparacionService } from '../../services/ordenesreparacion.service'

import { DetalleOrdenService } from '../../services/detalleorden.service';
import { DetalleOrden } from 'src/app/models/detalleorden';

@Component({
  selector: 'app-detalleestadoorden',
  templateUrl: './detalleestadoorden.component.html',
  styleUrls: ['./detalleestadoorden.component.css']
})
export class DetalleestadoordenComponent implements OnInit {
  pageActualDetalle = 0;
  total = 0;

  idOrden = 0;
  listDetalleOrden: any = {};
  ordenreparacion: any;

  progress = 0;

  tituloOrden: String = "Estado de la orden nro. " + this.route.snapshot.paramMap.get('idOrden');

  constructor(
    private datePipe: DatePipe,
    private ordenesrepService: OrdenesReparacionService,
    private detalleOrdenService: DetalleOrdenService,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.idOrden = +this.route.snapshot.paramMap.get('idOrden');
    this.GetDetalleOrden(this.idOrden);
    this.GetDetalleRepOrden(this.idOrden);  
  }


  GetDetalleOrden(nroOrden: number) {
    this.ordenesrepService.ObtenerDatosOrdenRep(nroOrden).subscribe(
      (res: any) => {
        this.ordenreparacion = res;   
        //transforma las fechas a un formato para mostrar
        this.ordenreparacion.FechaInicio = this.datePipe.transform(this.ordenreparacion.FechaInicio, "dd-MM-yyyy");
        this.ordenreparacion.FecRetiroEstimado = this.datePipe.transform(this.ordenreparacion.FecRetiroEstimado, "dd-MM-yyyy");

        //Define valor de la progress bar
        if (this.ordenreparacion.Estado == "Pendiente") {
          this.progress = 0
        }
        else if (this.ordenreparacion.Estado == "Reparando") {
          this.progress = 33
        }
        else if (this.ordenreparacion.Estado == "Reparado") {
          this.progress = 66
        }
        else if (this.ordenreparacion.Estado == "Entregado") {
          this.progress = 100
        }
        else if (this.ordenreparacion.Estado == "Cancelado") {
          this.progress = 0
        }
      },
      err => console.error(err)
    );
  }
  
  GetDetalleRepOrden(nroOrden: number) {
    this.listDetalleOrden = {};    
    //Trae los datos detalle de la orden
    this.detalleOrdenService.ObtenerDetalleOrdenDeOR(nroOrden).subscribe(
      (res: any) => {       
        this.listDetalleOrden = res;     
      },
      err => console.error(err)
    );
  }

}
