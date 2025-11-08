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
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from '../models/subscription';

@Component({
  selector: 'app-subscriptions',
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
    TooltipModule
  ],
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  selectedSubscriptions: Subscription[] = [];
  globalFilter: string = '';
  
  // Dialog
  displayDialog: boolean = false;
  subscription: Subscription = this.getEmptySubscription();
  isEditMode: boolean = false;

  planTypes = [
    { label: 'Aylık', value: 'monthly' },
    { label: '3 Aylık', value: 'quarterly' },
    { label: 'Yıllık', value: 'yearly' }
  ];

  ngOnInit() {
    // Örnek veriler
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    this.subscriptions = [
      {
        id: 1,
        vehicleId: 1,
        plateNumber: '34ABC123',
        ownerName: 'Ahmet Yılmaz',
        startDate: new Date('2024-01-01'),
        endDate: nextMonth,
        planType: 'monthly',
        price: 500,
        status: 'active',
        paymentStatus: 'paid'
      },
      {
        id: 2,
        vehicleId: 2,
        plateNumber: '06XYZ789',
        ownerName: 'Mehmet Demir',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-04-10'),
        planType: 'quarterly',
        price: 1350,
        status: 'active',
        paymentStatus: 'paid'
      },
      {
        id: 3,
        vehicleId: 3,
        plateNumber: '35DEF456',
        ownerName: 'Ayşe Kaya',
        startDate: new Date('2023-12-01'),
        endDate: new Date('2024-01-01'),
        planType: 'monthly',
        price: 500,
        status: 'expired',
        paymentStatus: 'paid'
      }
    ];
    this.filteredSubscriptions = this.subscriptions;
  }

  getEmptySubscription(): Subscription {
    return {
      id: 0,
      vehicleId: 0,
      plateNumber: '',
      ownerName: '',
      startDate: new Date(),
      endDate: new Date(),
      planType: 'monthly',
      price: 0,
      status: 'active',
      paymentStatus: 'pending'
    };
  }

  openNew() {
    this.subscription = this.getEmptySubscription();
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editSubscription(subscription: Subscription) {
    this.subscription = { ...subscription };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  saveSubscription() {
    this.calculatePrice();
    
    if (this.isEditMode) {
      const index = this.subscriptions.findIndex(s => s.id === this.subscription.id);
      if (index !== -1) {
        this.subscriptions[index] = { ...this.subscription };
      }
    } else {
      this.subscription.id = this.subscriptions.length + 1;
      this.subscriptions.push({ ...this.subscription });
    }
    this.filteredSubscriptions = [...this.subscriptions];
    this.displayDialog = false;
    this.subscription = this.getEmptySubscription();
  }

  deleteSubscription(subscription: Subscription) {
    this.subscriptions = this.subscriptions.filter(s => s.id !== subscription.id);
    this.filteredSubscriptions = [...this.subscriptions];
  }

  calculatePrice() {
    const days = Math.ceil((this.subscription.endDate.getTime() - this.subscription.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (this.subscription.planType === 'monthly') {
      this.subscription.price = 500;
    } else if (this.subscription.planType === 'quarterly') {
      this.subscription.price = 1350;
    } else if (this.subscription.planType === 'yearly') {
      this.subscription.price = 5000;
    }
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    if (status === 'active') return 'success';
    if (status === 'expired') return 'danger';
    return 'warning';
  }

  getStatusLabel(status: string): string {
    if (status === 'active') return 'Aktif';
    if (status === 'expired') return 'Süresi Dolmuş';
    return 'İptal Edilmiş';
  }

  getPaymentStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    if (status === 'paid') return 'success';
    if (status === 'pending') return 'warning';
    return 'danger';
  }

  getPaymentStatusLabel(status: string): string {
    if (status === 'paid') return 'Ödendi';
    if (status === 'pending') return 'Beklemede';
    return 'Gecikmiş';
  }

  getPlanTypeLabel(type: string): string {
    const plan = this.planTypes.find(p => p.value === type);
    return plan ? plan.label : type;
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter = value;
    
    if (!value) {
      this.filteredSubscriptions = this.subscriptions;
      return;
    }

    this.filteredSubscriptions = this.subscriptions.filter(sub => 
      sub.plateNumber.toLowerCase().includes(value.toLowerCase()) ||
      sub.ownerName.toLowerCase().includes(value.toLowerCase())
    );
  }

  clearFilters() {
    this.globalFilter = '';
    this.filteredSubscriptions = this.subscriptions;
  }
}

