import { NgModule } from '@angular/core';

import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';

@NgModule({

    declarations: [
        SideBarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,

    ],
    exports: [
        SideBarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
    ]
})

export class SharedModule { }
