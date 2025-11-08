import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

export interface Reservation {
  id: number;
  vehiclePlate: string;
  spotNumber: string;
  floor: number;
  section: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  ownerName: string;
  phone: string;
}

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    DialogModule,
    TagModule,
    DropdownModule,
    TooltipModule
  ],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  displayDialog: boolean = false;
  reservation: Reservation = this.getEmptyReservation();
  isEditMode: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  statusOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Tamamlandı', value: 'completed' },
    { label: 'İptal Edildi', value: 'cancelled' }
  ];

  floors = [1, 2, 3];
  sections = ['A', 'B'];
  spots: string[] = [];

  ngOnInit() {
    this.loadReservations();
    this.loadSpots();
  }

  loadSpots() {
    for (let floor = 1; floor <= 3; floor++) {
      for (const section of this.sections) {
        for (let i = 1; i <= 20; i++) {
          this.spots.push(`${section}${i.toString().padStart(2, '0')}`);
        }
      }
    }
  }

  loadReservations() {
    const now = new Date();
    this.reservations = [
      {
        id: 1,
        vehiclePlate: '34ABC123',
        spotNumber: 'A01',
        floor: 1,
        section: 'A',
        startDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        status: 'active',
        ownerName: 'Ahmet Yılmaz',
        phone: '0532 123 4567'
      },
      {
        id: 2,
        vehiclePlate: '06XYZ789',
        spotNumber: 'B05',
        floor: 1,
        section: 'B',
        startDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        status: 'completed',
        ownerName: 'Mehmet Demir',
        phone: '0533 987 6543'
      },
      {
        id: 3,
        vehiclePlate: '35DEF456',
        spotNumber: 'A10',
        floor: 2,
        section: 'A',
        startDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        status: 'active',
        ownerName: 'Ayşe Kaya',
        phone: '0542 555 1234'
      }
    ];
    this.filterReservations();
  }

  filterReservations() {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesSearch = !this.searchTerm || 
        reservation.vehiclePlate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reservation.spotNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reservation.ownerName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'all' || reservation.status === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }

  openNew() {
    this.reservation = this.getEmptyReservation();
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editReservation(reservation: Reservation) {
    this.reservation = { ...reservation };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  saveReservation() {
    if (this.isEditMode) {
      const index = this.reservations.findIndex(r => r.id === this.reservation.id);
      if (index !== -1) {
        this.reservations[index] = { ...this.reservation };
      }
    } else {
      this.reservation.id = this.reservations.length + 1;
      this.reservations.push({ ...this.reservation });
    }
    this.filterReservations();
    this.displayDialog = false;
    this.reservation = this.getEmptyReservation();
  }

  cancelReservation(reservation: Reservation) {
    if (confirm('Bu rezervasyonu iptal etmek istediğinize emin misiniz?')) {
      reservation.status = 'cancelled';
      this.filterReservations();
    }
  }

  deleteReservation(reservation: Reservation) {
    if (confirm('Bu rezervasyonu silmek istediğinize emin misiniz?')) {
      this.reservations = this.reservations.filter(r => r.id !== reservation.id);
      this.filterReservations();
    }
  }

  getEmptyReservation(): Reservation {
    return {
      id: 0,
      vehiclePlate: '',
      spotNumber: '',
      floor: 1,
      section: 'A',
      startDate: new Date(),
      endDate: new Date(),
      status: 'active',
      ownerName: '',
      phone: ''
    };
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'warning';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Aktif';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal Edildi';
      default: return 'Bilinmiyor';
    }
  }

  onSpotChange() {
    if (this.reservation.spotNumber) {
      const match = this.reservation.spotNumber.match(/^([AB])(\d+)$/);
      if (match) {
        this.reservation.section = match[1];
        // Floor'u spot numarasına göre belirle (basit mantık)
        const spotNum = parseInt(match[2]);
        if (spotNum <= 20) this.reservation.floor = 1;
        else if (spotNum <= 40) this.reservation.floor = 2;
        else this.reservation.floor = 3;
      }
    }
  }
}

