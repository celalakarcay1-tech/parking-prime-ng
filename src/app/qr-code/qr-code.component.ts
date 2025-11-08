import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

export interface QRCodeData {
  id: number;
  vehiclePlate: string;
  qrCode: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  qrCodes: QRCodeData[] = [];
  displayDialog: boolean = false;
  selectedQRCode: QRCodeData | null = null;
  newPlateNumber: string = '';

  ngOnInit() {
    this.loadQRCodes();
  }

  loadQRCodes() {
    const now = new Date();
    this.qrCodes = [
      {
        id: 1,
        vehiclePlate: '34ABC123',
        qrCode: 'QR-34ABC123-001',
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        id: 2,
        vehiclePlate: '06XYZ789',
        qrCode: 'QR-06XYZ789-002',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        id: 3,
        vehiclePlate: '35DEF456',
        qrCode: 'QR-35DEF456-003',
        createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        status: 'inactive'
      }
    ];
  }

  generateQRCode() {
    if (!this.newPlateNumber) {
      alert('Lütfen plaka numarası girin!');
      return;
    }

    const newQR: QRCodeData = {
      id: this.qrCodes.length + 1,
      vehiclePlate: this.newPlateNumber.toUpperCase(),
      qrCode: `QR-${this.newPlateNumber.toUpperCase()}-${String(this.qrCodes.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      status: 'active'
    };

    this.qrCodes.push(newQR);
    this.newPlateNumber = '';
    alert('QR kod başarıyla oluşturuldu!');
  }

  viewQRCode(qrCode: QRCodeData) {
    this.selectedQRCode = qrCode;
    this.displayDialog = true;
  }

  downloadQRCode(qrCode: QRCodeData) {
    // QR kod indirme simülasyonu
    alert(`${qrCode.qrCode} QR kodu indiriliyor...`);
  }

  toggleStatus(qrCode: QRCodeData) {
    qrCode.status = qrCode.status === 'active' ? 'inactive' : 'active';
  }

  deleteQRCode(qrCode: QRCodeData) {
    if (confirm('Bu QR kodunu silmek istediğinize emin misiniz?')) {
      this.qrCodes = this.qrCodes.filter(q => q.id !== qrCode.id);
    }
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    return status === 'active' ? 'success' : 'danger';
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Aktif' : 'Pasif';
  }
}

