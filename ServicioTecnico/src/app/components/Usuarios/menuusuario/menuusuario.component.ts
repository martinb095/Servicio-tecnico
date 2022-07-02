import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from "moment";

import { ModalService } from 'src/app/_modal';

import Swal from 'sweetalert2'

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menuusuario',
  templateUrl: './menuusuario.component.html',
  styleUrls: ['./menuusuario.component.css']
})
export class MenuusuarioComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  usuario: Usuario = {
    PkUsuario: 0,
    Nombre: "",
    Contrasenia: "",
    FkTipoUsuario: 0,
    UltimoIngreso: null,
    Mail: "",
  };

  pageActual: number = 1;

  pass: string = "";
  passRepe: string = "";

  constructor(
    private modalService: ModalService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerUsuarios();
  }

  ObtenerUsuarios() {
    this.listUsuarios = [];
    this.usuarioService.ObtenerUsuario().subscribe(
      (res: any) => {
        this.listUsuarios = res;
        // console.log(moment(res.UltimoIngreso).utc().format('DD-MM-YYYY HH:mm:ss'));

      },
      err => console.error(err)
    );

  }

  //Obtiene usuario de la fila y la asigna al objeto que despues actualiza
  SetValores(usuario: Usuario) {
    this.usuario = {
      PkUsuario: usuario.PkUsuario,
      Nombre: usuario.Nombre,
      Contrasenia: usuario.Contrasenia,
      FkTipoUsuario: usuario.FkTipoUsuario,
      UltimoIngreso: usuario.UltimoIngreso,
      Mail: usuario.Mail,
    };
    this.passRepe = usuario.Contrasenia;
  }

  SetNull() {
    this.usuario.PkUsuario = null;
    this.usuario.Nombre = null;
    this.usuario.Contrasenia = null;
    this.usuario.FkTipoUsuario = null;
    this.usuario.UltimoIngreso = null;
    this.usuario.Mail = null;
    this.passRepe = null;
  }

  GuardarUsuario() {
    //Almacena usuario      
    if (this.passRepe == this.usuario.Contrasenia) {
      this.usuarioService.GuardarUsuario(this.usuario).subscribe(
        res => {
          Swal.fire({ title: "Usuario guardado correctamente.", icon: "success" });
          this.ObtenerUsuarios();
          this.closeModal('ModalNuevoUsuario');      
        },
        err => console.error(err)
      )
    } else {
      Swal.fire({ title: "Las contraseñas no son iguales.", icon: "error" });
    }

  }

  ModificarUsuario() {
    //Almacena usuario     
    this.usuarioService.ActualizarUsuario(this.usuario.PkUsuario, this.usuario).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalEditarUsuario');
          Swal.fire({ title: "Usuario modificado correctamente.", icon: "success" });
          this.ObtenerUsuarios();
        }         
      },
      err => console.error(err)
    )
  }

  EliminarUsuario(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el usuario Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.EliminarUsuario(id).subscribe(res => {
          this.ObtenerUsuarios();
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Usuario nro. " + id + " eliminado correctamente." })
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
