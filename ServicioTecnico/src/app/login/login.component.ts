import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import Swal from 'sweetalert2';

import { LoginService } from '../services/login.service'
import { Usuario } from '../models/usuario'
import { MailService } from 'src/app/services/mail.service';
import { Mail } from '../models/Mail'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailValidation: boolean = true;
  datosMail: Mail;
  usuario: Usuario;
  contrasenia = ""
  mailRecuperar = ""

  constructor(
    private mailService: MailService,
    private modalService: ModalService,
    private loginService: LoginService,
    private router: Router
  ) { }


  ngOnInit() {
    
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.usuario = {
      'Nombre': null,
      'Contrasenia': null,
      'PkUsuario': null,
      'FkTipoUsuario': null,
      'UltimoIngreso': null,
      'Mail': null,
    };
    this.datosMail = {
      'mail': "",
      'contrasenia': ""
    };

    document.getElementById("tbUsuario").focus();
  };

  ValidarUsuario() {
    //busca el usuario
    this.usuario.Contrasenia = this.contrasenia;
    this.loginService.ValidarUsuario(this.usuario).subscribe(
      (res: any) => {
        var valido = res.exist;
        if (valido == true) {
          localStorage.setItem('ingreso', 'true');
          localStorage.setItem('username', this.usuario.Nombre);
          this.router.navigate(['/menuordenrep']);
        }
        else if (valido == false) {
          Swal.fire({ icon: 'error', title: "El usuario ingresado no es valido." })
        }
      },
      err => console.error(err)
    );
  }

  obtenerContrasenia() {
    this.mailRecuperar="martin_ballaman@hotmail.com";
    if (this.mailRecuperar == "") {
      Swal.fire({ title: "Debe ingresar un mail.", icon: "warning" });
      return;
    }
    if (this.mailService.validaMail(this.mailRecuperar) == false) {
      Swal.fire({ title: "Debe ingresar un mail valido.", icon: "warning" });
      return;
    }
    this.mailRecuperar="martin_ballaman@hotmail.com";   
    this.loginService.getPass(this.mailRecuperar).subscribe(
      res => {
        if (res != null) {
          var result = Object.values(res);          
          this.enviarMail(result[0]);
        }
        else {
          Swal.fire({ icon: 'warging', title: "El mail ingresado no existe." })
        }
      },
      err => console.error(err)
    )
  }

  enviarMail(contrasenia: string) {
    this.datosMail.mail = this.mailRecuperar;
    this.datosMail.contrasenia = contrasenia;    
    this.mailService.RecuperarPass(this.datosMail).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          Swal.fire({ title: "Mail enviado correctamente.", icon: "success" });
          this.closeModal("ModalMail");
        }
      },
      err => console.error(err)
    )
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}







