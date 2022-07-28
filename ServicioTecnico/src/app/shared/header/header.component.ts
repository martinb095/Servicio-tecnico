import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {

   
      Swal.fire({
        title: '¿Está seguro que desea cerrar sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, cerrar.',
        cancelButtonText: 'No, cancelar.'
      }).then((result) => {
        if (result.value) {
          localStorage.setItem('ingreso', "false");
          this.router.navigate(['/login'])
        }
      })
    


  }

}
