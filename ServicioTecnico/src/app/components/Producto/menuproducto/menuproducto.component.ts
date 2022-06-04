import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/_modal';

import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-menuproducto',
  templateUrl: './menuproducto.component.html',
  styleUrls: ['./menuproducto.component.css']
})
export class MenuproductoComponent implements OnInit {

    //-----Producto----------
    listProducto: Producto[] = [];
    producto: Producto = {
      PkProducto: 0,
      Nombre: "",
      Observacion: "",
      tiporepuesto: null,
    };
    productoBuscar: string;
    proPageActual: number = 1;
  constructor(
    private modalService: ModalService,
    private productoService: ProductoService, 
  ) { }

  ngOnInit() {
    this.ObtenerProducto();  
  }
//------------------------------------
  //Producto
  //------------------------------------
  ObtenerProducto() {
    this.listProducto = [];
    this.productoService.ObtenerProductos().subscribe(
      (res: any) => {
        this.listProducto = res;
      },
      err => console.error(err)
    );
  }

  EliminarProducto(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el producto Nro. ' + id + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.productoService.EliminarProducto(id).subscribe(res => {
          this.ObtenerProducto();
        },
          err => console.error(err)
        );
        //Mensaje informando el eliminado     
        Swal.fire({ icon: 'success', title: "Producto nro. " + id + " eliminado correctamente." })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({ title: "Cancelado", icon: "error" });
      }
    })
  }

  GuardarProducto() {   
    if (this.producto.Nombre == "" || this.producto.Nombre == null) {
      Swal.fire({ title: "El nombre del producto no puede estar vacio.", icon: "warning" });
      return;
    }
    this.productoService.GuardarProducto(this.producto).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoProducto');
          Swal.fire({ title: "Producto guardado correctamente.", icon: "success" });
          this.ObtenerProducto();
        }
      },
      err => console.error(err)
    )   
  }

  ModificarProducto() {
    if (this.producto.Nombre == "" || this.producto.Nombre == null) {
      Swal.fire({ title: "El nombre del producto no puede estar vacio.", icon: "warning" });
      return;
    }
    this.productoService.ActualizarProducto(this.producto.PkProducto, this.producto).subscribe(
      res => {
        var result = Object.values(res);
        if (result[0] == "OK") {
          //Mensaje informando el almacenado
          this.closeModal('ModalNuevoProducto');
          Swal.fire({ title: "Producto guardado correctamente.", icon: "success" });
          this.ObtenerProducto();
        }
      },
      err => console.error(err)
    )   
  }

  ProductoSegunNombre(valor: string) {
    this.listProducto = [];
    if (valor != "") {
      this.productoService.ObtenerProdPorNombre(valor).subscribe((data: Producto[]) => {
        this.listProducto = data;
      },
        err => console.error(err)
      );
    } else {
      this.ObtenerProducto();
    }
  }

  SetValores(producto: Producto) {    
    this.producto = {
      PkProducto: producto.PkProducto,
      Nombre:  producto.Nombre,
      Observacion: producto.Observacion,
      tiporepuesto: producto.tiporepuesto,
    };
  }

  SetNull() {  
    this.producto.PkProducto = null;
    this.producto.Nombre = null;
    this.producto.Observacion = null;
    this.producto.tiporepuesto = null;   
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
