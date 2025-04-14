export interface IVehicle {
    _id?: string;
    placa: string;
    chassi: string;
    renavam: string;
    modelo: string;
    marca: string;
    ano: number;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }