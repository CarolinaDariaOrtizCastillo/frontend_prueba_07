import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../../core/models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:2000/client';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // OBTENER TODOS LOS CLIENTES
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // OBTENER CLIENTE POR ID
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // CREAR CLIENTE
  createCliente(cliente: Omit<Cliente, 'clientId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'restoredAt'>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente, this.httpOptions);
  }

  // ACTUALIZAR CLIENTE
  updateCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente, this.httpOptions);
  }

  // ELIMINAR CLIENTE (soft delete)
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
