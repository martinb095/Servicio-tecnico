import { Routes } from '@angular/router';

//Fuera de app Root
import { LoginComponent } from '././login/login.component';
import { PagesComponent } from './pages/pages.component';
import { ConsultaestadoComponent } from './EstadoOrden/consultaestado/consultaestado.component';
import { DetalleestadoordenComponent } from './EstadoOrden/detalleestadoorden/detalleestadoorden.component';
//Usuarios
import { RegistrarUsuarioComponent } from './components/Usuarios/registrar-usuario/registrar-usuario.component';
import { MenuusuarioComponent } from './components/Usuarios/menuusuario/menuusuario.component';
//Clientes
import { MenuClienteComponent } from './components/Clientes/menu-cliente/menu-cliente.component';
//OrdenReparación
import { MenuOrdenrepComponent } from './components/OrdenRep/menu-ordenrep/menu-ordenrep.component';
import { NuevaOrdenComponent } from './components/OrdenRep/nueva-orden/nueva-orden.component';
import { PreOrdenComponent } from './components/OrdenRep/pre-orden/pre-orden.component';
import { ModificarOrdenComponent } from './components/OrdenRep/modificar-orden/modificar-orden.component';
//Repuestos
import { MenurepuestoComponent } from './components/repuestos/menurepuesto/menurepuesto.component';
//Tareas
import { MenutareasComponent } from './components/Tareas/menutareas/menutareas.component';
//modelo
import { MenumodeloComponent } from './components/Modelos/menumodelo/menumodelo.component';
//marca
import { MenumarcaComponent } from './components/Marcas/menumarca/menumarca.component';
//tipo productos
import { MenutiporepuestoComponent } from './components/TipoRepuestos/menutiporepuesto/menutiporepuesto.component';
//proveedores
import { MenuproveedorComponent } from './components/Proveedores/menuproveedor/menuproveedor.component';
//proveedores
import { MenupedidoComponent } from './components/Pedidos/menupedido/menupedido.component';

export const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'registrarusuario', component: RegistrarUsuarioComponent },
  { path: 'consultaestado', component: ConsultaestadoComponent },
  { path: 'detalleestadoorden/:idOrden', component: DetalleestadoordenComponent },

  //url inexistente  
  // { path: 'error', component: NopagefoundComponent },
  // { path: '**', pathMatch:'full', redirectTo: 'error' },
  {
    path: '',
    component: PagesComponent,
    children: [
      //clientes
      { path: 'menucliente', component: MenuClienteComponent },

      //Ordenes
      { path: 'menuordenrep', component: MenuOrdenrepComponent },
      { path: 'menuordenrep/preorden', component: PreOrdenComponent },
      { path: 'menuordenrep/nuevaorden', component: NuevaOrdenComponent },
      { path: 'menuordenrep/nuevaorden/:idcliente', component: NuevaOrdenComponent },
      { path: 'menuordenrep/modificar/:idorden', component: ModificarOrdenComponent },
      //Repuestos
      { path: 'menurepuesto', component: MenurepuestoComponent },
      //Tareas
      { path: 'menutarea', component: MenutareasComponent },
      //Modelos
      { path: 'menumodelo', component: MenumodeloComponent },
      //Marcas
      { path: 'menumarca', component: MenumarcaComponent },      
      //Tipo productos
      { path: 'menutiporepuesto', component: MenutiporepuestoComponent },
      //Usuarios
      { path: 'menuusuario', component: MenuusuarioComponent },
      //Proveedores
      { path: 'menuproveedor', component: MenuproveedorComponent },
      //Pedido
      { path: 'menupedido', component: MenupedidoComponent },

      { path: '**', redirectTo: '/login' },
    ]
  },
];
