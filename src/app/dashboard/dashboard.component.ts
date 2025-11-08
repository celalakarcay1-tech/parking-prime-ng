import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule, TagModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // İstatistikler
  totalVehicles: number = 0;
  activeSubscriptions: number = 0;
  todayRevenue: number = 0;
  monthlyRevenue: number = 0;
  occupiedSpots: number = 0;
  totalSpots: number = 100;

  // Grafik verileri
  revenueChartData: any;
  vehicleChartData: any;
  subscriptionChartData: any;
  paymentMethodChartData: any;

  chartOptions: any;

  ngOnInit() {
    // Örnek veriler
    this.totalVehicles = 45;
    this.activeSubscriptions = 32;
    this.todayRevenue = 1250;
    this.monthlyRevenue = 45000;
    this.occupiedSpots = 45;

    // Grafik seçenekleri
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

    // Gelir grafiği (Son 7 gün)
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

    // Araç tipi grafiği
    this.vehicleChartData = {
      labels: ['Binek', 'Ticari', 'Motosiklet', 'Diğer'],
      datasets: [
        {
          data: [35, 8, 2, 0],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(201, 203, 207, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 2
        }
      ]
    };

    // Abonelik durumu grafiği
    this.subscriptionChartData = {
      labels: ['Aktif', 'Süresi Dolmuş', 'İptal Edilmiş'],
      datasets: [
        {
          data: [32, 8, 5],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 2
        }
      ]
    };

    // Ödeme yöntemi grafiği
    this.paymentMethodChartData = {
      labels: ['Nakit', 'Kart', 'Online'],
      datasets: [
        {
          data: [15, 20, 10],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 2
        }
      ]
    };
  }

  getOccupancyPercentage(): number {
    return Math.round((this.occupiedSpots / this.totalSpots) * 100);
  }

  getOccupancySeverity(): 'success' | 'warning' | 'danger' {
    const percentage = this.getOccupancyPercentage();
    if (percentage < 50) return 'success';
    if (percentage < 80) return 'warning';
    return 'danger';
  }
}

