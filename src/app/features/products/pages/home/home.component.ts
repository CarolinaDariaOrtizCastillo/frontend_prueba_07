import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BenefitCard {
  title: string;
  highlight: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Arreglo de datos que alimenta las tres tarjetas doradas
  keyBenefits: BenefitCard[] = [
    {
      title: 'ESTABILIDAD',
      highlight: 'Tallos más gruesos',
      description: 'Estructura vegetal acelerada y robusta que soporta la carga completa del fruto.'
    },
    {
      title: 'FUERZA VISUAL',
      highlight: 'Hojas más verdes e intensas',
      description: 'El follaje se expande, multiplicando la capacidad de carga del cultivo.'
    },
    {
      title: 'RENDIMIENTO',
      highlight: 'Más peso en la cosecha',
      description: 'Volumen y kilo reales sin engaños al momento de comercializar la producción.'
    }
  ];

  constructor() {}
}