import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  styleUrl: './enrollments.component.css',
  templateUrl: './enrollments.component.html'
})
export class EnrollmentsComponent implements OnInit {
  message = 'Página de Inscripciones';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdr.detectChanges();
  }
}
