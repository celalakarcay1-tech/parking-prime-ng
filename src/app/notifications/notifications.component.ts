import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    BadgeModule,
    TooltipModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount: number = 0;

  ngOnInit() {
    this.loadNotifications();
    this.updateUnreadCount();
  }

  loadNotifications() {
    const now = new Date();
    this.notifications = [
      {
        id: 1,
        title: 'Ödeme Hatırlatması',
        message: '34ABC123 plakalı araç için ödeme bekleniyor.',
        type: 'warning',
        date: new Date(now.getTime() - 1 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        title: 'Abonelik Süresi Doluyor',
        message: 'Ahmet Yılmaz\'ın aboneliği 3 gün içinde dolacak.',
        type: 'warning',
        date: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 3,
        title: 'Yeni Araç Girişi',
        message: '06XYZ789 plakalı araç otoparka giriş yaptı.',
        type: 'info',
        date: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 4,
        title: 'Ödeme Alındı',
        message: '35DEF456 plakalı araç için ödeme başarıyla alındı.',
        type: 'success',
        date: new Date(now.getTime() - 5 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 5,
        title: 'Otopark Doluluk Uyarısı',
        message: 'Otopark doluluk oranı %80\'i aştı.',
        type: 'warning',
        date: new Date(now.getTime() - 6 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 6,
        title: 'Sistem Güncellemesi',
        message: 'Sistem başarıyla güncellendi.',
        type: 'success',
        date: new Date(now.getTime() - 12 * 60 * 60 * 1000),
        read: true
      }
    ];
  }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notification: Notification) {
    notification.read = true;
    this.updateUnreadCount();
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.updateUnreadCount();
  }

  deleteNotification(notification: Notification) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
    this.updateUnreadCount();
  }

  getTypeSeverity(type: string): 'success' | 'warning' | 'danger' | 'info' {
    return type as 'success' | 'warning' | 'danger' | 'info';
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'info': return 'Bilgi';
      case 'warning': return 'Uyarı';
      case 'success': return 'Başarılı';
      case 'error': return 'Hata';
      default: return 'Bilgi';
    }
  }
}

