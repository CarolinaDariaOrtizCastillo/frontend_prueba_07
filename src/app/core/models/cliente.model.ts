export interface Cliente {
  clientId: number;
  name: string;
  lastName: string;
  typeClient: string;
  businessName?: string;
  documentType: string;
  documentNumber: string;
  cellphoneNumber: string;
  email?: string;
  addressId?: number;
  membershipDate?: string | Date;
  status: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  restoredAt?: string | Date | null;
}
