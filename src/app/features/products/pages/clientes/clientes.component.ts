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
    typeClient: '',
    businessName: '',
    documentType: '',
    documentNumber: '',
    cellphoneNumber: '',
    email: '',
    addressId: undefined as number | undefined,
    membershipDate: '',
    status: 1
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
        this.clientes = data.filter((c: Cliente) => c.status === 1);
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
      typeClient: '',
      businessName: '',
      documentType: '',
      documentNumber: '',
      cellphoneNumber: '',
      email: '',
      addressId: undefined,
      membershipDate: '',
      status: 1
    };
  }

  saveCliente(): void {
    if (this.selectedCliente) {
      // Actualizar cliente
      this.clienteService.updateCliente(this.selectedCliente.clientId, this.formData).subscribe({
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
      this.clienteService.createCliente(this.formData as any).subscribe({
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

  editCliente(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.isEditing = true;
    this.formData = {
      name: cliente.name,
      lastName: cliente.lastName,
      typeClient: cliente.typeClient,
      businessName: cliente.businessName || '',
      documentType: cliente.documentType,
      documentNumber: cliente.documentNumber,
      cellphoneNumber: cliente.cellphoneNumber,
      email: cliente.email || '',
      addressId: cliente.addressId,
      membershipDate: cliente.membershipDate ? String(cliente.membershipDate) : '',
      status: cliente.status
    };
    this.cdr.detectChanges();
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
