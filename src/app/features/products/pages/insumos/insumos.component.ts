import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InsumoService } from '../../services/insumo.service';
import { Insumo } from '../../../../core/models/product.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.html',
  standalone: true,
  styleUrls: ['./insumos.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class InsumosComponent implements OnInit {
  insumos: Insumo[] = [];
  selectedInsumo: Insumo | null = null;
  showForm: boolean = true;
  form!: FormGroup;
  isEditing = false;
  isLoading = false;
  error: string = '';

  // Función para formatear fechas
  formatDate(fecha: string | Date | null | undefined): string {
    if (!fecha) return 'N/A';
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  }

  constructor(private insumoService: InsumoService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      stockActual: ['', [Validators.required, Validators.min(0)]],
      stockMinimo: ['', [Validators.required, Validators.min(0)]],
      medida: ['', [Validators.required, Validators.minLength(1)]],
      fechaCaducidad: [''],
      ubicacion: ['', [Validators.required, Validators.minLength(3)]],
      estado: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadInsumos();
  }

  loadInsumos(): void {
    this.isLoading = true;
    this.error = '';
    this.insumoService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        console.log('Datos recibidos del backend:', data);
        this.insumos = data.filter((i: Insumo) => i.estado);
        console.log('Datos filtrados (estado=true):', this.insumos);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Error al cargar insumos';
        console.error('Error al cargar insumos:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveInsumo(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => control.markAsTouched());
      return;
    }

    const formValue = this.form.value;
    
    // Convertir fecha al formato ISO (YYYY-MM-DD) que espera el backend
    let fechaCaducidad = null;
    if (formValue.fechaCaducidad && typeof formValue.fechaCaducidad === 'string' && formValue.fechaCaducidad !== '') {
      fechaCaducidad = formValue.fechaCaducidad;
    }
    
    // Preparar los datos para enviar al backend
    const insumoData = {
      nombre: formValue.nombre.trim(),
      stockActual: Number(formValue.stockActual),
      stockMinimo: Number(formValue.stockMinimo),
      medida: formValue.medida.toUpperCase(),
      fechaCaducidad: fechaCaducidad,
      ubicacion: formValue.ubicacion.trim(),
      estado: formValue.estado
    };

    console.log('Enviando al backend:', insumoData);

    if (this.isEditing && this.selectedInsumo) {
      // ACTUALIZAR INSUMO
      this.insumoService.updateInsumo(this.selectedInsumo.idInsumo, insumoData).subscribe({
        next: (response) => {
          console.log('Insumo actualizado correctamente:', response);
          this.cancelForm();
          this.loadInsumos();
        },
        error: (err: any) => {
          console.error('Error detallado al actualizar:', err);
          if (err.status === 400) {
            this.error = 'Error en los datos enviados. Verifique el formato de la fecha y los números.';
          } else if (err.status === 0) {
            this.error = 'No se pudo conectar con el servidor. Verifique que el backend esté corriendo en http://localhost:8085/insumo. Si el problema persiste, puede ser un error CORS - contacte al administrador del backend.';
          } else if (err.status === 403) {
            this.error = 'Error de permisos CORS. El servidor rechaza las peticiones desde esta origen.';
          } else {
            this.error = `Error al actualizar insumo: ${err.message || 'Error desconocido'}`;
          }
        }
      });
    } else {
      // CREAR NUEVO INSUMO
      this.insumoService.createInsumo(insumoData).subscribe({
        next: (response) => {
          console.log('Insumo creado correctamente:', response);
          this.cancelForm();
          this.loadInsumos();
        },
        error: (err: any) => {
          console.error('Error detallado al crear:', err);
          if (err.status === 400) {
            this.error = 'Error en los datos enviados. Verifique el formato de la fecha y los números.';
          } else if (err.status === 0) {
            this.error = 'No se pudo conectar con el servidor. Verifique que el backend esté corriendo en http://localhost:8085/insumo. Si el problema persiste, puede ser un error CORS - contacte al administrador del backend.';
          } else if (err.status === 403) {
            this.error = 'Error de permisos CORS. El servidor rechaza las peticiones desde esta origen.';
          } else {
            this.error = `Error al crear insumo: ${err.message || 'Error desconocido'}`;
          }
        }
      });
    }
  }

  editInsumo(insumo: Insumo): void {
    this.selectedInsumo = insumo;
    this.isEditing = true;
    this.showForm = true;
    
    // Convertir la fecha al formato YYYY-MM-DD para el input date
    let fechaFormato = '';
    if (insumo.fechaCaducidad) {
      const fecha = new Date(insumo.fechaCaducidad);
      if (!isNaN(fecha.getTime())) {
        fechaFormato = fecha.toISOString().split('T')[0];
      }
    }
    
    this.form.patchValue({
      nombre: insumo.nombre,
      stockActual: insumo.stockActual,
      stockMinimo: insumo.stockMinimo,
      medida: insumo.medida,
      fechaCaducidad: fechaFormato,
      ubicacion: insumo.ubicacion,
      estado: insumo.estado,
    });
    this.cdr.detectChanges();
  }

  cancelForm(): void {
    this.form.reset({ 
      nombre: '',
      stockActual: '',
      stockMinimo: '',
      medida: '',
      fechaCaducidad: '',
      ubicacion: '',
      estado: true 
    });
    this.selectedInsumo = null;
    this.isEditing = false;
    this.error = '';
  }

  deleteInsumo(insumoId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este insumo?')) {
      this.insumoService.deleteInsumo(insumoId).subscribe({
        next: () => {
          console.log('Insumo eliminado correctamente');
          this.loadInsumos();
        },
        error: (err: any) => {
          console.error('Error al eliminar:', err);
          this.error = 'Error al eliminar insumo';
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cancelForm();
    }
  }
}