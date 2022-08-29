import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MailService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  EnviarMail(datosMail: any) {    
    return this.http.post(this.API_URI + '/mail/', datosMail);    
  }   

  RecuperarPass(datosMail: any) {    
    return this.http.post(this.API_URI + "/mail/recuperarpass", datosMail);           
  }  

  EnviarWsp(datosWsp: any) {   
    return this.http.post(this.API_URI + "/mail/enviarwsp", datosWsp);   
  }  



  validaMail(email: string): boolean {
    let mailValido = false;
    'use strict';
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }
}
