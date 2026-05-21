import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  // Controla si se renderiza el desplegable administrativo
  mostrarMenuUsuario: boolean = false;

  constructor() {}

  // Alterna la visibilidad del menú evitando que el evento se propague
  toggleMenuUsuario(event: Event): void {
    event.stopPropagation();
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  // Cierra el menú cuando seleccionas un CRUD específico
  cerrarMenu(): void {
    this.mostrarMenuUsuario = false;
  }

  // Escucha todos los clics en la ventana; si clickeas fuera, el menú se esconde solo
  @HostListener('document:click', [])
  clickFuera(): void {
    this.mostrarMenuUsuario = false;
  }
}