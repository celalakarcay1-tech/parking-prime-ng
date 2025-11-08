import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';

export interface ReportData {
  id: number;
  date: Date;
  vehiclePlate: string;
  entryTime: Date;
  exitTime?: Date;
  duration: number;
  amount: number;
  paymentMethod: string;
  status: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    ChartModule,
    TagModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: ReportData[] = [];
  filteredReports: ReportData[] = [];
  
  // Filtreler
  startDate: Date = new Date();
  endDate: Date = new Date();
  reportType: string = 'daily';
  reportTypes = [
    { label: 'Günlük', value: 'daily' },
    { label: 'Haftalık', value: 'weekly' },
    { label: 'Aylık', value: 'monthly' }
  ];

  // İstatistikler
  totalRevenue: number = 0;
  totalVehicles: number = 0;
  averageDuration: number = 0;

  // Grafik verileri
  revenueChartData: any;
  vehicleChartData: any;
  chartOptions: any;

  ngOnInit() {
    this.initializeDates();
    this.loadReports();
    this.calculateStatistics();
    this.initializeCharts();
  }

  initializeDates() {
    const today = new Date();
    this.endDate = new Date(today);
    this.startDate = new Date(today);
    this.startDate.setDate(today.getDate() - 7); // Son 7 gün
  }

  loadReports() {
    // Örnek rapor verileri
    const now = new Date();
    this.reports = [
      {
        id: 1,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        vehiclePlate: '34ABC123',
        entryTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        duration: 2,
        amount: 50,
        paymentMethod: 'Kart',
        status: 'Tamamlandı'
      },
      {
        id: 2,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        vehiclePlate: '06XYZ789',
        entryTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        duration: 4,
        amount: 100,
        paymentMethod: 'Nakit',
        status: 'Tamamlandı'
      },
      {
        id: 3,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        vehiclePlate: '35DEF456',
        entryTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        duration: 3,
        amount: 75,
        paymentMethod: 'Online',
        status: 'Tamamlandı'
      },
      {
        id: 4,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        vehiclePlate: '16GHI789',
        entryTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        duration: 1,
        amount: 25,
        paymentMethod: 'Kart',
        status: 'Tamamlandı'
      },
      {
        id: 5,
        date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        vehiclePlate: '07JKL012',
        entryTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
        exitTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        duration: 6,
        amount: 150,
        paymentMethod: 'Nakit',
        status: 'Tamamlandı'
      }
    ];
    this.filterReports();
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report => {
      const reportDate = new Date(report.date);
      return reportDate >= this.startDate && reportDate <= this.endDate;
    });
    this.calculateStatistics();
  }

  calculateStatistics() {
    this.totalRevenue = this.filteredReports.reduce((sum, r) => sum + r.amount, 0);
    this.totalVehicles = this.filteredReports.length;
    const totalDuration = this.filteredReports.reduce((sum, r) => sum + r.duration, 0);
    this.averageDuration = this.totalVehicles > 0 ? Math.round(totalDuration / this.totalVehicles * 10) / 10 : 0;
  }

  getStatistics() {
    return {
      totalRevenue: this.totalRevenue,
      totalVehicles: this.totalVehicles,
      averageDuration: this.averageDuration
    };
  }

  initializeCharts() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Gelir grafiği
    this.revenueChartData = {
      labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
      datasets: [
        {
          label: 'Günlük Gelir (₺)',
          data: [1200, 1500, 1800, 1400, 2000, 2500, 2200],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          tension: 0.4
        }
      ]
    };

    // Araç sayısı grafiği
    this.vehicleChartData = {
      labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
      datasets: [
        {
          label: 'Günlük Araç Sayısı',
          data: [45, 52, 48, 55, 60, 65, 58],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          tension: 0.4
        }
      ]
    };
  }

  exportToExcel() {
    // Excel export simülasyonu
    const csv = this.generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `rapor_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToPDF() {
    // PDF export - window.print() kullanarak
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up engelleyici nedeniyle PDF oluşturulamadı. Lütfen pop-up engelleyiciyi kapatın.');
      return;
    }

    const htmlContent = this.generatePDFHTML();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Yazdırma dialogunu aç
    setTimeout(() => {
      printWindow.print();
      // Kullanıcı PDF olarak kaydedebilir
    }, 250);
  }

  generateCSV(): string {
    const headers = ['Tarih', 'Plaka', 'Giriş Saati', 'Çıkış Saati', 'Süre (saat)', 'Tutar', 'Ödeme Yöntemi', 'Durum'];
    const rows = this.filteredReports.map(report => [
      report.date.toISOString().split('T')[0],
      report.vehiclePlate,
      report.entryTime.toISOString().split('T')[1].substring(0, 5),
      report.exitTime ? report.exitTime.toISOString().split('T')[1].substring(0, 5) : '',
      report.duration.toString(),
      report.amount.toString(),
      report.paymentMethod,
      report.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // BOM ekle (Excel için Türkçe karakter desteği)
    return '\uFEFF' + csvContent;
  }

  generatePDFHTML(): string {
    const stats = this.getStatistics();
    const reportRows = this.filteredReports.map(report => `
      <tr>
        <td>${report.date.toLocaleDateString('tr-TR')}</td>
        <td>${report.vehiclePlate}</td>
        <td>${report.entryTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
        <td>${report.exitTime ? report.exitTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
        <td>${report.duration} saat</td>
        <td>${report.amount.toFixed(2)} ₺</td>
        <td>${report.paymentMethod}</td>
        <td>${report.status}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Otopark Raporu</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #1976d2;
            text-align: center;
          }
          .stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
          }
          .stat-item {
            text-align: center;
          }
          .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #1976d2;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #1976d2;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Otopark Raporu</h1>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">${stats.totalRevenue.toFixed(2)} ₺</div>
            <div>Toplam Gelir</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.totalVehicles}</div>
            <div>Toplam Araç</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.averageDuration} saat</div>
            <div>Ortalama Süre</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Plaka</th>
              <th>Giriş Saati</th>
              <th>Çıkış Saati</th>
              <th>Süre</th>
              <th>Tutar</th>
              <th>Ödeme Yöntemi</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            ${reportRows}
          </tbody>
        </table>
        <div class="footer">
          <p>Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}</p>
          <p>Otopark Yönetim Sistemi</p>
        </div>
      </body>
      </html>
    `;
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    if (status === 'Tamamlandı') return 'success';
    return 'warning';
  }
}

