import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ModalModule } from './_modal';
import { NgxWhastappButtonModule } from 'ngx-whatsapp-button';

//Rutas
import { appRoutes } from './index.routes';
import { RouterModule } from '@angular/router';

//Modulos
import { ServicesModule } from './services/services.module'
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
//usuarios
import { RegistrarUsuarioComponent } from './components/Usuarios/registrar-usuario/registrar-usuario.component';
import { MenuusuarioComponent } from './components/Usuarios/menuusuario/menuusuario.component';
//clientes
import { MenuClienteComponent } from './components/Clientes/menu-cliente/menu-cliente.component';
//Orden rep
import { MenuOrdenrepComponent } from './components/OrdenRep/menu-ordenrep/menu-ordenrep.component';
import { NuevaOrdenComponent } from './components/OrdenRep/nueva-orden/nueva-orden.component';
import { PreOrdenComponent } from './components/OrdenRep/pre-orden/pre-orden.component';
import { ModificarOrdenComponent } from './components/OrdenRep/modificar-orden/modificar-orden.component';
import { DetalleestadoordenComponent } from './EstadoOrden/detalleestadoorden/detalleestadoorden.component';
import { ConsultaestadoComponent } from './EstadoOrden/consultaestado/consultaestado.component';
//repuestos
import { MenurepuestoComponent } from './components/repuestos/menurepuesto/menurepuesto.component';

//tareas
import { MenutareasComponent } from './components/Tareas/menutareas/menutareas.component';
//modelos
import { MenumodeloComponent } from './components/Modelos/menumodelo/menumodelo.component';

//marcas
import { MenumarcaComponent } from './components/Marcas/menumarca/menumarca.component';
//tipo repuesto
import { MenutiporepuestoComponent } from './components/TipoRepuestos/menutiporepuesto/menutiporepuesto.component';
//proveedores
import { MenuproveedorComponent } from './components/Proveedores/menuproveedor/menuproveedor.component';
//pedidos
import { MenupedidoComponent } from './components/Pedidos/menupedido/menupedido.component';
import { NuevoPedidoComponent } from './components/Pedidos/nuevo-pedido/nuevo-pedido.component';
import { ModificarPedidoComponent } from './components/Pedidos/modificar-pedido/modificar-pedido.component';
import { InformesComponent } from './components/Informes/informes.component';

import { MenurubrosComponent } from './components/Rubros/menurubros/menurubros.component';

import { MenupresupuestoComponent } from './components/Presupuestos/menupresupuesto/menupresupuesto.component';
import { ModificarpresupuestoComponent } from './components/Presupuestos/modificarpresupuesto/modificarpresupuesto.component';
import { NuevopresupuestoComponent } from './components/Presupuestos/nuevopresupuesto/nuevopresupuesto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultaestadoComponent,
    RegistrarUsuarioComponent,
    // AdminComponent,
    MenuClienteComponent,
    MenuOrdenrepComponent,
    NuevaOrdenComponent,
    NuevaOrdenComponent,
    PreOrdenComponent,
    ModificarOrdenComponent,
    MenurepuestoComponent,
    DetalleestadoordenComponent,
    MenutareasComponent,
    MenumodeloComponent,  
    MenumarcaComponent,
    MenutiporepuestoComponent,
    MenutiporepuestoComponent,
    MenuusuarioComponent,
    MenuproveedorComponent,
    MenupedidoComponent,
    NuevoPedidoComponent,
    ModificarPedidoComponent,
    InformesComponent,
    MenurubrosComponent,
    MenupresupuestoComponent,  
    ModificarpresupuestoComponent, 
    NuevopresupuestoComponent  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    SharedModule,
    PagesModule,
    NgxPaginationModule,
    ServicesModule,
    ModalModule,
    NgxWhastappButtonModule
  ],
  providers: [
    DatePipe,
    // ClienteService,
    // OrdenesReparacionService,
    // MarcaService,
    // ProductoService
    // ModeloService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
