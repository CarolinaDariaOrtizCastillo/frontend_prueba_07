import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ValuePillar {
  title: string;
  description: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {

  // Información estructurada para las tres tarjetas de propuesta de valor inferiores
  valuePillars: ValuePillar[] = [
    {
      title: 'Formulación propia y exacta',
      description: 'No revendemos productos genéricos. Cada lote es formulado manualmente bajo estrictos porcentajes e insumos importados de alta calidad, garantizando que la promesa de efectividad se cumpla rigurosamente en la tierra.'
    },
    {
      title: 'Seguridad sin engaños',
      description: 'Formulamos únicamente lo que funciona. Si un lote no cumple con la exactitud requerida, preferimos no venderlo antes que poner en riesgo la campaña o la confianza de nuestros clientes.'
    },
    {
      title: 'Garantía en cada bidón',
      description: 'Monitoreamos la estabilidad orgánica de nuestras presentaciones para asegurar la correcta activación de sus microorganismos benéficos en el momento de la aplicación.'
    }
  ];

  constructor() {}
}