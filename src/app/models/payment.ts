export interface Payment {
  id: number;
  subscriptionId?: number;
  vehicleId: number;
  plateNumber: string;
  amount: number;
  paymentDate: Date;
  paymentType: 'subscription' | 'hourly' | 'daily';
  paymentMethod: 'cash' | 'card' | 'online';
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

