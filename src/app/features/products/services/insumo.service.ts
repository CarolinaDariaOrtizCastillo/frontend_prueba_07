import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insumo } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class InsumoService {
  private apiUrl = 'http://localhost:8085/v1/api/insumo';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // OBTENER TODOS LOS INSUMOS
  getInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.apiUrl);
  }

  // OBTENER INSUMO POR ID
  getInsumoById(id: number): Observable<Insumo> {
    return this.http.get<Insumo>(`${this.apiUrl}/${id}`);
  }

  // CREAR INSUMO
  createInsumo(insumo: Omit<Insumo, 'idInsumo' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'restoredAt'>): Observable<Insumo> {
    return this.http.post<Insumo>(`${this.apiUrl}/save`, insumo, this.httpOptions);
  }

  // ACTUALIZAR INSUMO
  updateInsumo(id: number, insumo: Partial<Insumo>): Observable<Insumo> {
    return this.http.put<Insumo>(`${this.apiUrl}/update/${id}`, insumo, this.httpOptions);
  }

  // ELIMINAR INSUMO (soft delete)
  deleteInsumo(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/delete/${id}`, {});
  }
}
