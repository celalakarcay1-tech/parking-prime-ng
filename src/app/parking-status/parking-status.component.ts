import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../models/vehicle';

export interface ParkingSpot {
  id: number;
  spotNumber: string;
  floor: number;
  section: string;
  status: 'empty' | 'occupied' | 'reserved';
  vehicleId?: number;
  vehiclePlate?: string;
  entryTime?: Date;
}

@Component({
  selector: 'app-parking-status',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.css']
})
export class ParkingStatusComponent implements OnInit {
  parkingSpots: ParkingSpot[] = [];
  filteredSpots: ParkingSpot[] = [];
  selectedSpot: ParkingSpot | null = null;
  displayDialog: boolean = false;
  searchTerm: string = '';
  selectedFloor: number = 1;
  floors: number[] = [1, 2, 3];

  ngOnInit() {
    this.initializeParkingSpots();
    this.assignParkedVehicles();
    this.filteredSpots = this.parkingSpots;
  }

  getParkedVehicles(): Vehicle[] {
    const now = new Date();
    return [
      {
        id: 1,
        plateNumber: '34ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        color: 'Beyaz',
        ownerName: 'Ahmet Yılmaz',
        ownerPhone: '0532 123 4567',
        entryDate: new Date(now.getTime() - 2 * 60 * 60 * 1000),
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
        entryDate: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        status: 'parked'
      },
      {
        id: 4,
        plateNumber: '16GHI789',
        brand: 'Renault',
        model: 'Clio',
        color: 'Kırmızı',
        ownerName: 'Fatma Şahin',
        ownerPhone: '0534 111 2233',
        entryDate: new Date(now.getTime() - 30 * 60 * 1000),
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
        entryDate: new Date(now.getTime() - 6 * 60 * 60 * 1000),
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
        entryDate: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        status: 'parked'
      },
      {
        id: 8,
        plateNumber: '35STU901',
        brand: 'Peugeot',
        model: '208',
        color: 'Gri',
        ownerName: 'Elif Yıldız',
        ownerPhone: '0538 555 6677',
        entryDate: new Date(now.getTime() - 3 * 60 * 60 * 1000),
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
        entryDate: new Date(now.getTime() - 5 * 60 * 60 * 1000),
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
        entryDate: new Date(now.getTime() - 45 * 60 * 1000),
        status: 'parked'
      },
      {
        id: 12,
        plateNumber: '06EFG123',
        brand: 'Volvo',
        model: 'S60',
        color: 'Mavi',
        ownerName: 'Deniz Yılmaz',
        ownerPhone: '0542 999 0011',
        entryDate: new Date(now.getTime() - 90 * 60 * 1000),
        status: 'parked'
      }
    ];
  }

  initializeParkingSpots() {
    // Tüm yerleri boş olarak oluştur
    // Kat 1 - A Bölümü
    for (let i = 1; i <= 20; i++) {
      this.parkingSpots.push({
        id: i,
        spotNumber: `A${i.toString().padStart(2, '0')}`,
        floor: 1,
        section: 'A',
        status: 'empty'
      });
    }

    // Kat 1 - B Bölümü
    for (let i = 1; i <= 20; i++) {
      this.parkingSpots.push({
        id: i + 20,
        spotNumber: `B${i.toString().padStart(2, '0')}`,
        floor: 1,
        section: 'B',
        status: 'empty'
      });
    }

    // Kat 2 - A Bölümü
    for (let i = 1; i <= 20; i++) {
      this.parkingSpots.push({
        id: i + 40,
        spotNumber: `A${i.toString().padStart(2, '0')}`,
        floor: 2,
        section: 'A',
        status: 'empty'
      });
    }

    // Kat 2 - B Bölümü
    for (let i = 1; i <= 20; i++) {
      this.parkingSpots.push({
        id: i + 60,
        spotNumber: `B${i.toString().padStart(2, '0')}`,
        floor: 2,
        section: 'B',
        status: 'empty'
      });
    }
  }

  assignParkedVehicles() {
    const parkedVehicles = this.getParkedVehicles();
    const emptySpots = this.parkingSpots.filter(spot => spot.status === 'empty');
    
    // Park halindeki araçları boş yerlere atama
    parkedVehicles.forEach((vehicle, index) => {
      if (index < emptySpots.length) {
        const spot = emptySpots[index];
        spot.status = 'occupied';
        spot.vehicleId = vehicle.id;
        spot.vehiclePlate = vehicle.plateNumber;
        spot.entryTime = vehicle.entryDate;
      }
    });
  }

  getSpotsByFloor(floor: number): ParkingSpot[] {
    return this.filteredSpots.filter(spot => spot.floor === floor);
  }

  getSpotsBySection(floor: number, section: string): ParkingSpot[] {
    return this.getSpotsByFloor(floor).filter(spot => spot.section === section);
  }


  getStatusLabel(status: string): string {
    switch (status) {
      case 'empty':
        return 'Boş';
      case 'occupied':
        return 'Dolu';
      case 'reserved':
        return 'Rezerve';
      default:
        return 'Bilinmiyor';
    }
  }

  getStatusSeverity(status: string): 'success' | 'danger' | 'warning' {
    switch (status) {
      case 'empty':
        return 'success';
      case 'occupied':
        return 'danger';
      case 'reserved':
        return 'warning';
      default:
        return 'success';
    }
  }

  onSpotClick(spot: ParkingSpot) {
    if (spot.status === 'occupied' || spot.status === 'reserved') {
      this.selectedSpot = spot;
      this.displayDialog = true;
    }
  }

  getVehicleInfo(spot: ParkingSpot): Vehicle | null {
    if (!spot.vehicleId) return null;
    const vehicles = this.getParkedVehicles();
    return vehicles.find(v => v.id === spot.vehicleId) || null;
  }

  getStatistics() {
    const total = this.filteredSpots.length;
    const occupied = this.filteredSpots.filter(s => s.status === 'occupied').length;
    const empty = this.filteredSpots.filter(s => s.status === 'empty').length;
    const reserved = this.filteredSpots.filter(s => s.status === 'reserved').length;
    const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

    return { total, occupied, empty, reserved, occupancyRate };
  }

  filterByFloor(floor: number) {
    this.selectedFloor = floor;
    this.filteredSpots = this.parkingSpots.filter(spot => spot.floor === floor);
  }

  searchSpots() {
    if (!this.searchTerm) {
      this.filteredSpots = this.parkingSpots.filter(spot => spot.floor === this.selectedFloor);
      return;
    }

    this.filteredSpots = this.parkingSpots.filter(spot =>
      spot.spotNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      spot.vehiclePlate?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredSpots = this.parkingSpots.filter(spot => spot.floor === this.selectedFloor);
  }
}

