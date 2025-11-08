import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ToggleButtonModule,
    MessageModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Fiyatlandırma
  hourlyRate: number = 25;
  dailyRate: number = 200;
  monthlyRate: number = 5000;
  
  // Otopark Ayarları
  totalSpots: number = 80;
  reservedSpots: number = 10;
  
  // Sistem Ayarları
  autoExit: boolean = true;
  notificationsEnabled: boolean = true;
  emailNotifications: boolean = false;
  
  // Kullanıcı Ayarları
  username: string = 'admin';
  email: string = 'admin@otopark.com';
  phone: string = '0532 123 4567';
  
  showSuccess: boolean = false;
  successMessage: string = '';

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    // Ayarları localStorage'dan yükle veya varsayılan değerleri kullan
    const savedSettings = localStorage.getItem('parkingSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.hourlyRate = settings.hourlyRate || 25;
      this.dailyRate = settings.dailyRate || 200;
      this.monthlyRate = settings.monthlyRate || 5000;
      this.totalSpots = settings.totalSpots || 80;
      this.reservedSpots = settings.reservedSpots || 10;
      this.autoExit = settings.autoExit !== undefined ? settings.autoExit : true;
      this.notificationsEnabled = settings.notificationsEnabled !== undefined ? settings.notificationsEnabled : true;
      this.emailNotifications = settings.emailNotifications !== undefined ? settings.emailNotifications : false;
    }
  }

  saveSettings() {
    const settings = {
      hourlyRate: this.hourlyRate,
      dailyRate: this.dailyRate,
      monthlyRate: this.monthlyRate,
      totalSpots: this.totalSpots,
      reservedSpots: this.reservedSpots,
      autoExit: this.autoExit,
      notificationsEnabled: this.notificationsEnabled,
      emailNotifications: this.emailNotifications
    };
    
    localStorage.setItem('parkingSettings', JSON.stringify(settings));
    
    this.showSuccess = true;
    this.successMessage = 'Ayarlar başarıyla kaydedildi!';
    
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }

  resetSettings() {
    if (confirm('Tüm ayarları varsayılan değerlere sıfırlamak istediğinize emin misiniz?')) {
      this.hourlyRate = 25;
      this.dailyRate = 200;
      this.monthlyRate = 5000;
      this.totalSpots = 80;
      this.reservedSpots = 10;
      this.autoExit = true;
      this.notificationsEnabled = true;
      this.emailNotifications = false;
      this.saveSettings();
    }
  }
}

