import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './soporte.html',
  styleUrls: ['./soporte.css']
})
export class SoporteComponent {

  // Controla la visibilidad del pop-up de contacto
  mostrarModal: boolean = false;

  constructor() {}

  // Simulación o canal de incidencias del stock
  reportarAgroTecno(): void {
    window.open('https://wa.me/tu_numero_soporte?text=Hola,%20tengo%20un%20problema%20con%20el%20stock/pedidos%20en%20AgroTecno', '_blank');
  }

  // Abre el modal emergente (Pop-up) con los datos del equipo técnico
  abrirSoporteDesarrollador(): void {
    this.mostrarModal = true;
  }

  // Cierra el modal emergente
  cerrarSoporteDesarrollador(): void {
    this.mostrarModal = false;
  }
}