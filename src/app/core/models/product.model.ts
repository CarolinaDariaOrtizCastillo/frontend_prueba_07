export interface Insumo {
  idInsumo: number;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  medida: string;
  fechaCaducidad?: string | Date | null;
  ubicacion?: string;
  estado: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  restoredAt?: string | Date | null;
}
