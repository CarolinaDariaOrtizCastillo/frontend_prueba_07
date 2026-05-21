import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BenefitCard {
  title: string;
  description: string;
  imageSrc?: string;
}

@Component({
  selector: 'app-respaldo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './respaldo.html',
  styleUrls: ['./respaldo.css']
})
export class RespaldoComponent {

  // Arreglo de datos para los bloques de impacto inferiores con círculos sobrepuestos
  keyBenefits: BenefitCard[] = [
    {
      title: 'Canales directos',
      description: 'Mantenemos un contacto fluido y constante contigo a través de WhatsApp y llamadas telefónicas para resolver cualquier inquietud de manera ágil.'
    },
    {
      title: 'Evaluación médica del cultivo',
      description: 'Si tu planta presenta una deficiencia, nos trasladamos en nuestros vehículos hasta el lugar para examinar el campo y recomendarte la solución que necesitas.'
    }
  ];

  constructor() {}
}