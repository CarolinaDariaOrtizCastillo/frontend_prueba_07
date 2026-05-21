import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formula } from '../../../core/models/formula.model';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  private apiUrl = 'http://localhost:2000/formula';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // OBTENER TODAS LAS FÓRMULAS
  getFormulas(): Observable<Formula[]> {
    return this.http.get<Formula[]>(this.apiUrl);
  }

  // OBTENER FÓRMULA POR ID
  getFormulaById(id: number): Observable<Formula> {
    return this.http.get<Formula>(`${this.apiUrl}/${id}`);
  }

  // CREAR FÓRMULA
  createFormula(formula: Omit<Formula, 'formulaId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'restoredAt'>): Observable<Formula> {
    return this.http.post<Formula>(this.apiUrl, formula, this.httpOptions);
  }

  // ACTUALIZAR FÓRMULA
  updateFormula(id: number, formula: Partial<Formula>): Observable<Formula> {
    return this.http.put<Formula>(`${this.apiUrl}/${id}`, formula, this.httpOptions);
  }

  // ELIMINAR FÓRMULA (soft delete)
  deleteFormula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
