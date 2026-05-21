export interface Cliente {
  clientId: number;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email?: string;
  registrationDate?: string | Date;
  estado: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  restoredAt?: string | Date | null;
}
