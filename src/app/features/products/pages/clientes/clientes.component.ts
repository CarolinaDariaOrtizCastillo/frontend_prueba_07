import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.html',
  standalone: true,
  styleUrls: ['./clientes.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  selectedCliente: Cliente | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false;
  error: string = '';

  formData = {
    name: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    email: '',
    registrationDate: '',
    estado: true
  };

  constructor(private clienteService: ClienteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.isLoading = true;
    this.error = '';
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data.filter((c: Cliente) => c.estado);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Error al cargar clientes';
        console.error('Error al cargar clientes:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelForm(): void {
    this.resetFormData();
    this.selectedCliente = null;
    this.isEditing = false;
  }

  resetFormData(): void {
    this.formData = {
      name: '',
      lastName: '',
      documentType: '',
      documentNumber: '',
      phone: '',
      email: '',
      registrationDate: '',
      estado: true
    };
  }

  saveCliente(): void {
    // Preparar el payload con los campos requeridos
    const payload = {
      name: this.formData.name,
      lastName: this.formData.lastName,
      documentType: this.formData.documentType,
      documentNumber: this.formData.documentNumber,
      phone: this.formData.phone,
      email: this.formData.email || undefined,
      registrationDate: this.formData.registrationDate ? this.formatDateToDateTime(this.formData.registrationDate) : new Date().toISOString(),
      estado: this.formData.estado
    };

    if (this.selectedCliente) {
      // Actualizar cliente
      this.clienteService.updateCliente(this.selectedCliente.clientId, payload).subscribe({
        next: () => {
          this.cancelForm();
          this.loadClientes();
        },
        error: (err: any) => {
          this.error = 'Error al actualizar cliente';
          console.error('Error al actualizar', err);
        }
      });
    } else {
      // Crear nuevo cliente
      this.clienteService.createCliente(payload as any).subscribe({
        next: () => {
          this.cancelForm();
          this.loadClientes();
        },
        error: (err: any) => {
          this.error = 'Error al crear cliente';
          console.error('Error al crear', err);
        }
      });
    }
  }

  formatDateToDateTime(dateStr: string): string {
    // Convierte YYYY-MM-DD a ISO DateTime con hora 00:00:00
    if (!dateStr) return new Date().toISOString();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return new Date().toISOString();
    return date.toISOString();
  }

  editCliente(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.isEditing = true;
    this.formData = {
      name: cliente.name,
      lastName: cliente.lastName,
      documentType: cliente.documentType,
      documentNumber: cliente.documentNumber,
      phone: cliente.phone,
      email: cliente.email || '',
      registrationDate: cliente.registrationDate ? this.formatDateForInput(cliente.registrationDate) : '',
      estado: cliente.estado
    };
    this.cdr.detectChanges();
  }

  formatDateForInput(date: string | Date): string {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return '';
    }

    return parsedDate.toISOString().split('T')[0];
  }

  deleteCliente(clienteId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.clienteService.deleteCliente(clienteId).subscribe({
        next: () => this.loadClientes(),
        error: (err: any) => {
          this.error = 'Error al eliminar cliente';
          console.error('Error al eliminar', err);
        }
      });
    }
  }

  restoreCliente(clienteId: number): void {
    if (confirm('¿Desea restaurar este cliente?')) {
      // Puedes agregar un método restore en el servicio si lo requieres
      this.loadClientes();
    }
  }
}
