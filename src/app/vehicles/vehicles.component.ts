import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicles',
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
    TooltipModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  selectedVehicles: Vehicle[] = [];
  globalFilter: string = '';
  loading: boolean = false;
  
  // Dialog
  displayDialog: boolean = false;
  vehicle: Vehicle = this.getEmptyVehicle();
  isEditMode: boolean = false;

  ngOnInit() {
    // Daha fazla örnek veri
    const now = new Date();
    this.vehicles = [
      {
        id: 1,
        plateNumber: '34ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        color: 'Beyaz',
        ownerName: 'Ahmet Yılmaz',
        ownerPhone: '0532 123 4567',
        entryDate: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 saat önce
        status: 'parked',
        subscriptionId: 1
      },
      {
        id: 2,
        plateNumber: '06XYZ789',
        brand: 'Ford',
        model: 'Focus',
        color: 'Siyah',
        ownerName: 'Mehmet Demir',
        ownerPhone: '0533 987 6543',
        entryDate: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 saat önce
        status: 'parked'
      },
      {
        id: 3,
        plateNumber: '35DEF456',
        brand: 'Volkswagen',
        model: 'Golf',
        color: 'Gri',
        ownerName: 'Ayşe Kaya',
        ownerPhone: '0542 555 1234',
        entryDate: new Date('2024-01-14T14:20:00'),
        exitDate: new Date('2024-01-14T18:45:00'),
        status: 'exited'
      },
      {
        id: 4,
        plateNumber: '16GHI789',
        brand: 'Renault',
        model: 'Clio',
        color: 'Kırmızı',
        ownerName: 'Fatma Şahin',
        ownerPhone: '0534 111 2233',
        entryDate: new Date(now.getTime() - 30 * 60 * 1000), // 30 dakika önce
        status: 'parked'
      },
      {
        id: 5,
        plateNumber: '07JKL012',
        brand: 'Opel',
        model: 'Corsa',
        color: 'Mavi',
        ownerName: 'Ali Veli',
        ownerPhone: '0535 222 3344',
        entryDate: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 saat önce
        status: 'parked',
        subscriptionId: 2
      },
      {
        id: 6,
        plateNumber: '34MNO345',
        brand: 'Hyundai',
        model: 'i20',
        color: 'Beyaz',
        ownerName: 'Zeynep Aktaş',
        ownerPhone: '0536 333 4455',
        entryDate: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 saat önce
        status: 'parked'
      },
      {
        id: 7,
        plateNumber: '06PQR678',
        brand: 'Fiat',
        model: 'Egea',
        color: 'Siyah',
        ownerName: 'Mustafa Özkan',
        ownerPhone: '0537 444 5566',
        entryDate: new Date('2024-01-14T10:00:00'),
        exitDate: new Date('2024-01-14T16:30:00'),
        status: 'exited'
      },
      {
        id: 8,
        plateNumber: '35STU901',
        brand: 'Peugeot',
        model: '208',
        color: 'Gri',
        ownerName: 'Elif Yıldız',
        ownerPhone: '0538 555 6677',
        entryDate: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 saat önce
        status: 'parked'
      },
      {
        id: 9,
        plateNumber: '16VWX234',
        brand: 'BMW',
        model: '3 Series',
        color: 'Siyah',
        ownerName: 'Can Arslan',
        ownerPhone: '0539 666 7788',
        entryDate: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 saat önce
        status: 'parked',
        subscriptionId: 3
      },
      {
        id: 10,
        plateNumber: '07YZA567',
        brand: 'Mercedes',
        model: 'C-Class',
        color: 'Gümüş',
        ownerName: 'Selin Demir',
        ownerPhone: '0540 777 8899',
        entryDate: new Date(now.getTime() - 45 * 60 * 1000), // 45 dakika önce
        status: 'parked'
      },
      {
        id: 11,
        plateNumber: '34BCD890',
        brand: 'Audi',
        model: 'A3',
        color: 'Beyaz',
        ownerName: 'Burak Kaya',
        ownerPhone: '0541 888 9900',
        entryDate: new Date('2024-01-13T09:00:00'),
        exitDate: new Date('2024-01-13T17:00:00'),
        status: 'exited'
      },
      {
        id: 12,
        plateNumber: '06EFG123',
        brand: 'Volvo',
        model: 'S60',
        color: 'Mavi',
        ownerName: 'Deniz Yılmaz',
        ownerPhone: '0542 999 0011',
        entryDate: new Date(now.getTime() - 90 * 60 * 1000), // 90 dakika önce
        status: 'parked'
      }
    ];
    this.filteredVehicles = this.vehicles;
  }

  getEmptyVehicle(): Vehicle {
    return {
      id: 0,
      plateNumber: '',
      brand: '',
      model: '',
      color: '',
      ownerName: '',
      ownerPhone: '',
      entryDate: new Date(),
      status: 'parked'
    };
  }

  openNew() {
    this.vehicle = this.getEmptyVehicle();
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editVehicle(vehicle: Vehicle) {
    this.vehicle = { ...vehicle };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  saveVehicle() {
    if (this.isEditMode) {
      const index = this.vehicles.findIndex(v => v.id === this.vehicle.id);
      if (index !== -1) {
        this.vehicles[index] = { ...this.vehicle };
      }
    } else {
      this.vehicle.id = this.vehicles.length + 1;
      this.vehicles.push({ ...this.vehicle });
    }
    this.filteredVehicles = [...this.vehicles];
    this.displayDialog = false;
    this.vehicle = this.getEmptyVehicle();
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
    this.filteredVehicles = [...this.vehicles];
  }

  exitVehicle(vehicle: Vehicle) {
    vehicle.exitDate = new Date();
    vehicle.status = 'exited';
    const index = this.vehicles.findIndex(v => v.id === vehicle.id);
    if (index !== -1) {
      this.vehicles[index] = { ...vehicle };
      this.filteredVehicles = [...this.vehicles];
    }
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    if (status === 'parked') return 'success';
    return 'danger';
  }

  getStatusLabel(status: string): string {
    if (status === 'parked') return 'Park Halinde';
    return 'Çıkış Yapıldı';
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter = value;
    
    // Debounce için kısa bir gecikme ekle (büyük veri setleri için)
    if (this.vehicles.length > 1000) {
      this.loading = true;
      setTimeout(() => {
        this.performFilter(value);
        this.loading = false;
      }, 300);
    } else {
      this.performFilter(value);
    }
  }

  private performFilter(value: string) {
    if (!value) {
      this.filteredVehicles = this.vehicles;
      return;
    }

    const lowerValue = value.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(vehicle => 
      vehicle.plateNumber.toLowerCase().includes(lowerValue) ||
      vehicle.brand.toLowerCase().includes(lowerValue) ||
      vehicle.model.toLowerCase().includes(lowerValue) ||
      vehicle.ownerName.toLowerCase().includes(lowerValue)
    );
  }

  clearFilters() {
    this.globalFilter = '';
    this.filteredVehicles = this.vehicles;
  }

  getParkedCount(): number {
    return this.filteredVehicles.filter(v => v.status === 'parked').length;
  }

  getExitedCount(): number {
    return this.filteredVehicles.filter(v => v.status === 'exited').length;
  }
}

