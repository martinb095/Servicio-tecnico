import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { ClienteService } from './cliente.service';
import { OrdenesReparacionService } from './ordenesreparacion.service';
import { MarcaService } from './marca.service';
import { ProductoService } from './producto.service';
import { ModeloService } from './modelo.service';
import { LoginService } from './login.service';
import { CiudadService } from './ciudad.service';

@NgModule({

  imports: [
    CommonModule
  ],

  providers: [
        ClienteService,
        OrdenesReparacionService,
        MarcaService,
        ProductoService,
        ModeloService,
        LoginService,
        CiudadService
      ],
     })

export class ServicesModule{};