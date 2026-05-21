import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CompanyPillar {
  title: string;
  content: string;
  iconClass: string;
}

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrls: ['./nosotros.css']
})
export class AboutComponent {

  companyPillars: CompanyPillar[] = [
    {
      title: 'Nuestra Misión',
      content: 'Ofrecer soluciones especializadas en nutrición foliar orgánica que impulsen al máximo el desarrollo, la fuerza y el rendimiento de los cultivos. Nos comprometemos a romper la desconfianza del mercado entregando un servicio técnico posventa personalizado en campo, asegurando que cada inversión se traduzca en kilos reales y una alta rentabilidad para el agricultor.',
      iconClass: 'icon-mision'
    },
    {
      title: 'Nuestra Visión',
      content: 'Consolidar nuestra presencia en los valles costeros de Ica y expandir el respaldo de nuestras fórmulas orgánicas hacia las zonas agrícolas de la Sierra peruana. Proyectamos el establecimiento de tiendas físicas estratégicas que faciliten un acceso directo a nuestros productos, posicionando a Agrodelcroix como el aliado de confianza definitivo para los productores de todo el país.',
      iconClass: 'icon-vision'
    }
  ];

  constructor() {}
}