import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../producto.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  productoEditando: Producto = { id: 0, nombre: '', desripcion: '', precio: 0, stock: 0 };
  nuevoProducto: Producto = { id: 0, nombre: '', desripcion: '', precio: 0, stock: 0 };
  editMode: boolean = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  editarProducto(producto: Producto): void {
    this.productoEditando = { ...producto };
    this.editMode = true;
  }

  actualizarProducto(): void {
    //if (this.productoEditando.id !==0 ) {
      this.productoService.updateProducto(this.productoEditando.id, this.productoEditando).pipe(
        finalize(() => {
          // Esto siempre se ejecuta, ya sea éxito o error
        this.cargarProductos();
        this.cancelarEdicion();
        })
      ).subscribe({
        next: () => {
          // Aquí puedes manejar el caso de éxito si lo necesitas
        },
        error: (error) => {
          // Aquí puedes manejar el error si lo necesitas
          console.error('Error al agregar el producto', error);
        }
      });
    //}
  }

  eliminarProducto(id: number): void {
    this.productoService.deleteProducto(id).pipe(
      finalize(() => {
        // Esto siempre se ejecuta, ya sea éxito o error
        this.cargarProductos();
        this.nuevoProducto = { id: 0, nombre: '', desripcion: '', precio: 0, stock: 0 }; // Reset nuevoProducto
      })
    ).subscribe({
      next: () => {
        // Aquí puedes manejar el caso de éxito si lo necesitas
      },
      error: (error) => {
        // Aquí puedes manejar el error si lo necesitas
        console.error('Error al agregar el producto', error);
      }
    });
  }

  insertarProducto(): void {
    this.productoService.addProducto(this.nuevoProducto).pipe(
      finalize(() => {
        // Esto siempre se ejecuta, ya sea éxito o error
        this.cargarProductos();
        this.nuevoProducto = { id: 0, nombre: '', desripcion: '', precio: 0, stock: 0 }; // Reset nuevoProducto
      })
    ).subscribe({
      next: () => {
        // Aquí puedes manejar el caso de éxito si lo necesitas
      },
      error: (error) => {
        // Aquí puedes manejar el error si lo necesitas
        console.error('Error al agregar el producto', error);
      }
    });
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.productoEditando = { id: 0, nombre: '', desripcion: '', precio: 0, stock: 0 };
  }
}
