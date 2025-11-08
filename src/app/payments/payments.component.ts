import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TagModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    TooltipModule
  ],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  selectedPayments: Payment[] = [];
  globalFilter: string = '';
  
  // Dialog
  displayDialog: boolean = false;
  payment: Payment = this.getEmptyPayment();
  isEditMode: boolean = false;

  paymentTypes = [
    { label: 'Abonelik', value: 'subscription' },
    { label: 'Saatlik', value: 'hourly' },
    { label: 'Günlük', value: 'daily' }
  ];

  paymentMethods = [
    { label: 'Nakit', value: 'cash' },
    { label: 'Kart', value: 'card' },
    { label: 'Online', value: 'online' }
  ];

  ngOnInit() {
    // Örnek veriler
    this.payments = [
      {
        id: 1,
        subscriptionId: 1,
        vehicleId: 1,
        plateNumber: '34ABC123',
        amount: 500,
        paymentDate: new Date('2024-01-01'),
        paymentType: 'subscription',
        paymentMethod: 'card',
        status: 'completed',
        description: 'Aylık abonelik ödemesi'
      },
      {
        id: 2,
        vehicleId: 2,
        plateNumber: '06XYZ789',
        amount: 25,
        paymentDate: new Date('2024-01-15T10:30:00'),
        paymentType: 'hourly',
        paymentMethod: 'cash',
        status: 'completed',
        description: '2 saatlik park ücreti'
      },
      {
        id: 3,
        subscriptionId: 2,
        vehicleId: 2,
        plateNumber: '06XYZ789',
        amount: 1350,
        paymentDate: new Date('2024-01-10'),
        paymentType: 'subscription',
        paymentMethod: 'online',
        status: 'completed',
        description: '3 aylık abonelik ödemesi'
      }
    ];
    this.filteredPayments = this.payments;
  }

  getEmptyPayment(): Payment {
    return {
      id: 0,
      vehicleId: 0,
      plateNumber: '',
      amount: 0,
      paymentDate: new Date(),
      paymentType: 'hourly',
      paymentMethod: 'cash',
      status: 'pending'
    };
  }

  openNew() {
    this.payment = this.getEmptyPayment();
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editPayment(payment: Payment) {
    this.payment = { ...payment };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  savePayment() {
    if (this.isEditMode) {
      const index = this.payments.findIndex(p => p.id === this.payment.id);
      if (index !== -1) {
        this.payments[index] = { ...this.payment };
      }
    } else {
      this.payment.id = this.payments.length + 1;
      this.payments.push({ ...this.payment });
    }
    this.filteredPayments = [...this.payments];
    this.displayDialog = false;
    this.payment = this.getEmptyPayment();
  }

  deletePayment(payment: Payment) {
    this.payments = this.payments.filter(p => p.id !== payment.id);
    this.filteredPayments = [...this.payments];
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    if (status === 'completed') return 'success';
    if (status === 'pending') return 'warning';
    return 'danger';
  }

  getStatusLabel(status: string): string {
    if (status === 'completed') return 'Tamamlandı';
    if (status === 'pending') return 'Beklemede';
    return 'Başarısız';
  }

  getPaymentTypeLabel(type: string): string {
    const paymentType = this.paymentTypes.find(pt => pt.value === type);
    return paymentType ? paymentType.label : type;
  }

  getPaymentMethodLabel(method: string): string {
    const paymentMethod = this.paymentMethods.find(pm => pm.value === method);
    return paymentMethod ? paymentMethod.label : method;
  }

  getTotalRevenue(): number {
    return this.filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter = value;
    
    if (!value) {
      this.filteredPayments = this.payments;
      return;
    }

    this.filteredPayments = this.payments.filter(payment => 
      payment.plateNumber.toLowerCase().includes(value.toLowerCase()) ||
      payment.paymentType.toLowerCase().includes(value.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(value.toLowerCase())
    );
  }

  clearFilters() {
    this.globalFilter = '';
    this.filteredPayments = this.payments;
  }
}

