import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

export interface HistoryRecord {
  id: number;
  vehiclePlate: string;
  entryTime: Date;
  exitTime?: Date;
  duration?: number;
  amount?: number;
  paymentMethod?: string;
  status: 'parked' | 'exited';
  spotNumber?: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    TagModule,
    InputTextModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: HistoryRecord[] = [];
  filteredHistory: HistoryRecord[] = [];
  searchTerm: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();

  ngOnInit() {
    this.initializeDates();
    this.loadHistory();
  }

  initializeDates() {
    const today = new Date();
    this.endDate = new Date(today);
    this.startDate = new Date(today);
    this.startDate.setDate(today.getDate() - 30); // Son 30 gün
  }

  loadHistory() {
    const now = new Date();
    this.history = [
      {
        id: 1,
        vehiclePlate: '34ABC123',
        entryTime: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        exitTime: undefined,
        status: 'parked',
        spotNumber: 'A01'
      },
      {
        id: 2,
        vehiclePlate: '06XYZ789',
        entryTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        duration: 4,
        amount: 100,
        paymentMethod: 'Nakit',
        status: 'exited',
        spotNumber: 'A02'
      },
      {
        id: 3,
        vehiclePlate: '35DEF456',
        entryTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        duration: 3,
        amount: 75,
        paymentMethod: 'Kart',
        status: 'exited',
        spotNumber: 'B01'
      },
      {
        id: 4,
        vehiclePlate: '16GHI789',
        entryTime: new Date(now.getTime() - 30 * 60 * 1000),
        exitTime: undefined,
        status: 'parked',
        spotNumber: 'A03'
      },
      {
        id: 5,
        vehiclePlate: '07JKL012',
        entryTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        duration: 6,
        amount: 150,
        paymentMethod: 'Online',
        status: 'exited',
        spotNumber: 'B02'
      }
    ];
    this.filterHistory();
  }

  filterHistory() {
    this.filteredHistory = this.history.filter(record => {
      const matchesSearch = !this.searchTerm || 
        record.vehiclePlate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.spotNumber?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const recordDate = new Date(record.entryTime);
      const matchesDate = recordDate >= this.startDate && recordDate <= this.endDate;
      
      return matchesSearch && matchesDate;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.initializeDates();
    this.filterHistory();
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    if (status === 'parked') return 'success';
    return 'danger';
  }

  getStatusLabel(status: string): string {
    if (status === 'parked') return 'Park Halinde';
    return 'Çıkış Yapıldı';
  }
}

