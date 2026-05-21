import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormulaService } from '../../services/formula.service';
import { Formula } from '../../../../core/models/formula.model';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.html',
  styleUrls: ['./formulas.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class FormulasComponent implements OnInit {
  formulas: Formula[] = [];
  selectedFormula: Formula | null = null;
  showForm: boolean = true;
  form!: FormGroup;
  isEditing = false;
  isLoading = false;
  error: string = '';

  constructor(private formulaService: FormulaService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      standardBatch: ['', [Validators.required, Validators.min(0.1)]],
      productionTime: ['', [Validators.required, Validators.min(1)]],
      estado: [true]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';
    this.formulaService.getFormulas().subscribe({
      next: (data) => {
        this.formulas = data.filter(f => f.estado);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Error al cargar fórmulas';
        console.error('Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveFormula(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => control.markAsTouched());
      return;
    }

    const val = this.form.value;
    const payload = {
      name: val.name,
      description: val.description,
      standardBatch: Number(val.standardBatch),
      productionTime: Number(val.productionTime),
      estado: Boolean(val.estado)
    };

    if (this.isEditing && this.selectedFormula) {
      this.formulaService.updateFormula(this.selectedFormula.formulaId, payload).subscribe({
        next: () => {
          this.cancelForm();
          this.loadData();
        },
        error: (err: any) => {
          this.error = 'Error al actualizar fórmula';
          console.error('Error:', err);
        }
      });
    } else {
      this.formulaService.createFormula(payload).subscribe({
        next: () => {
          this.cancelForm();
          this.loadData();
        },
        error: (err: any) => {
          this.error = 'Error al crear fórmula';
          console.error('Error:', err);
        }
      });
    }
  }

  editFormula(f: Formula): void {
    this.selectedFormula = f;
    this.isEditing = true;
    this.showForm = true;
    this.form.patchValue({
      name: f.name,
      description: f.description,
      standardBatch: f.standardBatch,
      productionTime: f.productionTime,
      estado: f.estado
    });
    this.cdr.detectChanges();
  }

  deleteFormula(id: number): void {
    if (confirm('¿Eliminar fórmula?')) {
      this.formulaService.deleteFormula(id).subscribe({
        next: () => this.loadData(),
        error: (err: any) => {
          this.error = 'Error al eliminar fórmula';
          console.error('Error:', err);
        }
      });
    }
  }

  cancelForm(): void {
    this.form.reset({ estado: true });
    this.isEditing = false;
    this.selectedFormula = null;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cancelForm();
    }
  }
}
