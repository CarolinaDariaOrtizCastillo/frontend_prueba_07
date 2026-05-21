import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  // Propiedad booleana para alternar el menú del dashboard
  mostrarMenuUsuario: boolean = false;

  constructor() {}

  // Abre o cierra el menú al hacer clic en el botón circular de usuario
  toggleMenuUsuario(event: Event): void {
    event.stopPropagation(); // Evita que el clic cierre el menú inmediatamente
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  // Cierra el menú al seleccionar un CRUD para una navegación limpia
  cerrarMenu(): void {
    this.mostrarMenuUsuario = false;
  }

  // Detecta clics en cualquier parte de la pantalla externa para esconder el menú automáticamente
  @HostListener('document:click', [])
  clickFueraDeLaInterfaz(): void {
    this.mostrarMenuUsuario = false;
  }
}