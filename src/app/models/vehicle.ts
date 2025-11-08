export interface Vehicle {
  id: number;
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  ownerName: string;
  ownerPhone: string;
  entryDate: Date;
  exitDate?: Date;
  status: 'parked' | 'exited';
  subscriptionId?: number;
}

