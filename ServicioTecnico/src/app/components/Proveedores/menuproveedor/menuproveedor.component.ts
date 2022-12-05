import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { SharedService } from 'src/app/services/shared.service';

import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-menuproveedor',
  templateUrl: './menuproveedor.component.html',
  styleUrls: ['./menuproveedor.component.css']
})
export class MenuproveedorComponent implements OnInit {

  listProveedor: Proveedor[] = [];
  listProvincias: any[] = [];
  listCiudades: any[] = [];

  //Valor que toma el input de buscar
  proveedorBuscar: string;

  idProvincia: number;

  pageActual: number = 1;
  proveedor: Proveedor = {
    PkProveedor: 0,
    Nombre: "",
    Firma: "",
    FkCiudad: 0,
    Telefono: "",
    Mail: "",
    Cuit: "",
    Contacto1: "",
    Contacto2: "",
    Calle: "",
    Numero: 0,
    Piso: 0,
    Depto: "",
    Activo: null
  };

  constructor(
    private modalService: ModalService,
    private proveedorService: ProveedorService,
    private ciudadService: CiudadService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    //valido si existe la sesion
    let valido = localStorage.getItem('ingreso');
    if (valido != "true") {
      this.router.navigate(['/login'])
    }
    this.ObtenerProvincias();
    this.ObtenerProveedores();
  }

  ObtenerProveedores() {
    this.listProveedor = [];
    this.proveedorService.ObtenerProveedores().subscribe(
      (res: any) => {
        this.listProveedor = res;
      },
      err => console.error(err)
    );
  }

  ObtenerProvincias() {
    this.listProvincias = [];
    this.ciudadService.ObtenerProvincias().subscribe(
      (res: any) => {
        this.listProvincias = res;
      },
      err => console.error(err)
    );
  }

  onSelectCiudad(idCiudad: number) {
    if (idCiudad == null) {
      return;
    }
    this.listCiudades = [];
    this.ciudadService.ObtenerCiudadesXCod(idCiudad).subscribe(
      (res: any) => {
        this.listCiudades = res;
        this.idProvincia = res[0].FkProvincia;
      },
      err => console.error(err)
    );
  }

  onSelectProv(idProv: number) {
    this.listCiudades = [];
    this.ciudadService.ObtenerCiudadesXProv(idProv).subscribe(
      (res: any) => {
        this.listCiudades = res;
      },
      err => console.error(err)
    );
  }

  ProveedorSegunNombre(valor: string) {
    this.listProveedor = [];
    if (valor != "") {
      this.proveedorService.ObtenerProvPorNombre(valor).subscribe((data: Proveedor[]) => {
        this.listProveedor = data;
      },
        err => console.error(err)
      );
    } else {
      this.ObtenerProveedores();
    }
  }

  EliminarProveedor(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el proveedor Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.proveedorService.EliminarProveedor(id).subscribe(res => {
          this.ObtenerProveedores();
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Proveedor Nro. " + id + " eliminado correctamente." })

      }
    })
  }

  GuardarProveedor() {
    this.proveedor.Activo = true;
    if (this.proveedor.Nombre == "" || this.proveedor.Nombre == null) {
      Swal.fire({ title: "El nombre del proveedor no puede estar vacio.", icon: "warning" });
      return;
    }
    //Almacena proveedor   
    this.proveedorService.GuardarProveedor(this.proveedor).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoProveedor');
          Swal.fire({ title: "Proveedor guardado correctamente.", icon: "success" });
          this.ObtenerProveedores();
        }
      },
      err => console.error(err)
    )
  }

  //Obtiene el proveedor de la fila y la asigna al objeto que despues actualiza
  SetValores(proveedor: Proveedor) {
    this.proveedor = {
      PkProveedor: proveedor.PkProveedor,
      Nombre: proveedor.Nombre,
      Firma: proveedor.Firma,
      FkCiudad: proveedor.FkCiudad,
      Telefono: proveedor.Telefono,
      Mail: proveedor.Mail,
      Cuit: proveedor.Cuit,
      Contacto1: proveedor.Contacto1,
      Contacto2: proveedor.Contacto2,
      Calle: proveedor.Calle,
      Numero: proveedor.Numero,
      Piso: proveedor.Piso,
      Depto: proveedor.Depto,
      Activo: proveedor.Activo,
    };

    //Falta Obtener la Provincia 
    this.onSelectCiudad(proveedor.FkCiudad);
  }

  ModificarProveedor() {
    //Modifica proveedor   
    if (this.proveedor.Nombre == "" || this.proveedor.Nombre == null) {
      Swal.fire({ title: "El nombre del proveedor no puede estar vacio.", icon: "warning" });
      return;
    }
    this.proveedorService.ActualizarProveedor(this.proveedor.PkProveedor, this.proveedor).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalEditarProveedor');
          Swal.fire({ title: "Proveedor modificado correctamente.", icon: "success" });
          this.ObtenerProveedores();
        }
      },
      err => console.error(err)
    )
  }

  SetNull() {
    this.proveedor.PkProveedor = 0,
      this.proveedor.Nombre = "",
      this.proveedor.Firma = "",
      this.proveedor.FkCiudad = 0,
      this.proveedor.Telefono = "",
      this.proveedor.Mail = "",
      this.proveedor.Cuit = "",
      this.proveedor.Contacto1 = "",
      this.proveedor.Contacto2 = "",
      this.proveedor.Calle = "",
      this.proveedor.Numero = 0,
      this.proveedor.Piso = 0,
      this.proveedor.Depto = "",
      this.proveedor.Activo = null,
      this.idProvincia = null;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  exportexcel() {
    this.sharedService.exportexcel("Proveedores", this.listProveedor);
  }
}
