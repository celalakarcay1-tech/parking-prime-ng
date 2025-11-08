export interface Subscription {
  id: number;
  vehicleId: number;
  plateNumber: string;
  ownerName: string;
  startDate: Date;
  endDate: Date;
  planType: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  status: 'active' | 'expired' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

