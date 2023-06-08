import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from "moment";
import { SharedService } from 'src/app/services/shared.service';
import { ModalService } from 'src/app/_modal';

import Swal from 'sweetalert2'

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MailService } from 'src/app/services/mail.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-menuusuario',
  templateUrl: './menuusuario.component.html',
  styleUrls: ['./menuusuario.component.css']
})
export class MenuusuarioComponent implements OnInit {

  listUsuarios: Usuario[] = [];
  listExcel: any[] = [];

  usuario: Usuario = {
    PkUsuario: 0,
    Nombre: "",
    Contrasenia: "",
    FkTipoUsuario: 1,
    //UltimoIngreso: null,
    Mail: "",
  };

  pageActual: number = 1;

  pass: string = "";
  passRepe: string = "";

  constructor(
    private modalService: ModalService,
    private usuarioService: UsuarioService,
    private router: Router,
    private sharedService: SharedService,
    private excelService: ExcelService,
    private mailService: MailService,
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
      //UltimoIngreso: usuario.UltimoIngreso,
      Mail: usuario.Mail,
    };
    this.passRepe = usuario.Contrasenia;
  }

  SetNull() {
    this.usuario.PkUsuario = null;
    this.usuario.Nombre = null;
    this.usuario.Contrasenia = null;
    this.usuario.FkTipoUsuario = null;
    //this.usuario.UltimoIngreso = null;
    this.usuario.Mail = null;
    this.passRepe = null;
  }

  GuardarUsuario() {
    //Almacena usuario   
    if (this.validarUsuario() == false) {
      return;
    }
    this.usuarioService.GuardarUsuario(this.usuario).subscribe(
      res => {
        var result = Object.values(res);        
        const results = result[0][0];                
        if (results.OK == "OK") {
          Swal.fire({ title: "Usuario guardado correctamente.", icon: "success" });
          this.closeModal('ModalNuevoUsuario');
          this.ObtenerUsuarios();
        }
        else {
          Swal.fire({ title: "El mail o nombre ingresado ya esta asignado a otro usuario.", icon: "warning" });
        }
      },
      err => console.error(err)
    )
  }


  ModificarUsuario() {
    if (this.validarUsuario() == false) {
      return;
    }
    this.usuarioService.ActualizarUsuario(this.usuario.PkUsuario, this.usuario).subscribe(
      res => {
        var result = Object.values(res);        
        const results = result[0][0];                
        if (results.OK == "OK") {
          Swal.fire({ title: "Usuario modificado correctamente.", icon: "success" });
          this.closeModal('ModalEditarUsuario');
          this.ObtenerUsuarios();
        }
        else {
          Swal.fire({ title: "El mail o nombre ingresado ya esta asignado a otro usuario.", icon: "warning" });
        }       
      },
      err => console.error(err)
    )
  }

  validarUsuario() {
    if (this.usuario.Nombre == "" || this.usuario.Nombre == null) {
      Swal.fire({ title: "Debe ingresar un nombre.", icon: "warning" });
      return false;
    }
    if (this.usuario.Contrasenia == "" || this.usuario.Contrasenia == null) {
      Swal.fire({ title: "Debe ingresar una contraseña.", icon: "warning" });
      return false;
    }
    if (this.passRepe != this.usuario.Contrasenia) {
      Swal.fire({ title: "Las contraseñas no son iguales.", icon: "warning" });
      return false;
    }
    if (this.usuario.FkTipoUsuario == null) {
      Swal.fire({ title: "Debe seleccionar un tipo de usuario.", icon: "warning" });
      return false;
    }
    if (this.usuario.Mail == "" || this.usuario.Mail == null) {
      Swal.fire({ title: "Debe ingresar un mail.", icon: "warning" });
      return false;
    }
    if (this.mailService.validaMail(this.usuario.Mail) == false) {
      Swal.fire({ title: "Debe ingresar un mail valido.", icon: "warning" });
      return false;
    }
    return true;
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


  exportexcel() {
    this.listExcel = [];
    this.excelService.obtenerExcelUsuarios().subscribe(
      (res: any) => {
        this.listExcel = res;
        this.sharedService.exportexcel("Usuarios", this.listExcel);
      },
      err => console.error(err)
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
