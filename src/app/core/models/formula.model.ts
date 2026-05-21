export interface Formula {
  formulaId: number;
  name: string;
  description?: string;
  standardBatch: number;
  productionTime: number;
  estado: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  restoredAt?: string | Date | null;
}
