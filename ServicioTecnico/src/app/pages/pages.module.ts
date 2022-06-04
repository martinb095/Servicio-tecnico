import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module'

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

//Rutas
import { appRoutes } from '../index.routes';
import { RouterModule } from '@angular/router';

@NgModule({

    declarations: [
        DashboardComponent,
        PagesComponent
    ],

    exports: [
        DashboardComponent
    ],

    imports: [        
        SharedModule,        
        RouterModule.forRoot(appRoutes),
     
    ]
})

export class PagesModule { };