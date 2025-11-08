import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { PaymentsComponent } from './payments/payments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    ButtonModule,
    TooltipModule,
    DashboardComponent,
    VehiclesComponent,
    SubscriptionsComponent,
    PaymentsComponent
  ],
  template: `
    <div class="app-container">
      <!-- Sidebar -->
      <p-sidebar 
        *ngIf="router.url !== '/login'"
        [(visible)]="sidebarVisible" 
        position="left" 
        [modal]="true" 
        [showCloseIcon]="true"
        [dismissible]="true"
        styleClass="app-sidebar">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <div class="logo">
              <i class="pi pi-car"></i>
              <span class="logo-text">Otopark Yönetim</span>
            </div>
            <p-button 
              icon="pi pi-times" 
              [text]="true"
              [rounded]="true"
              (onClick)="sidebarVisible = false"
              styleClass="close-btn"
              pTooltip="Kapat"
              tooltipPosition="left">
            </p-button>
          </div>
          
          <nav class="sidebar-nav">
            <a 
              *ngFor="let item of menuItems" 
              [routerLink]="item.routerLink"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: item.routerLink === '/dashboard'}"
              (click)="closeSidebarOnMobile()"
              class="nav-item">
              <i [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          </nav>
        </div>
      </p-sidebar>

      <!-- Main Content -->
      <div class="main-content" *ngIf="router.url !== '/login'">
        <!-- Top Bar -->
        <div class="top-bar">
          <p-button 
            icon="pi pi-bars" 
            [text]="true"
            (onClick)="sidebarVisible = true"
            styleClass="menu-toggle">
          </p-button>
          <h2 class="page-title">{{ getCurrentPageTitle() }}</h2>
          <div class="user-info">
            <span class="username">{{ getUsername() }}</span>
            <p-button 
              icon="pi pi-sign-out" 
              [text]="true"
              [rounded]="true"
              (onClick)="logout()"
              pTooltip="Çıkış Yap"
              tooltipPosition="bottom"
              styleClass="logout-btn">
            </p-button>
          </div>
        </div>
        
        <!-- Content -->
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>

      <!-- Login sayfası için -->
      <div *ngIf="router.url === '/login'" class="login-page-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    ::ng-deep .app-sidebar {
      width: 280px;
      background: linear-gradient(180deg, #1976d2 0%, #1565c0 100%);
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    ::ng-deep .app-sidebar .p-sidebar-content {
      padding: 0;
    }

    .sidebar-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
      flex: 1;
    }

    .close-btn {
      color: white !important;
      margin-left: 1rem;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.2) !important;
    }

    ::ng-deep .app-sidebar .p-sidebar-header {
      display: none;
    }

    .logo i {
      font-size: 1.75rem;
      margin-right: 0.75rem;
    }

    .logo-text {
      font-size: 1.1rem;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      transition: all 0.3s;
      border-left: 3px solid transparent;
    }

    .nav-item i {
      font-size: 1.25rem;
      margin-right: 1rem;
      width: 24px;
    }

    .nav-item span {
      font-size: 1rem;
      font-weight: 500;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-left-color: rgba(255, 255, 255, 0.5);
    }

    .nav-item.active {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border-left-color: white;
      font-weight: 600;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 0;
      transition: margin-left 0.3s;
    }

    ::ng-deep .app-sidebar.p-sidebar-active ~ .main-content {
      margin-left: 280px;
    }

    .top-bar {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: white;
      border-bottom: 1px solid #e9ecef;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      gap: 1rem;
    }

    .menu-toggle {
      font-size: 1.25rem;
    }

    .page-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      flex: 1;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .username {
      color: #495057;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .logout-btn {
      color: #dc3545;
    }

    .logout-btn:hover {
      background: #fee !important;
    }

    .content-wrapper {
      flex: 1;
      padding: 0;
      overflow-y: auto;
    }

    .login-page-wrapper {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
    }

    @media (max-width: 768px) {
      ::ng-deep .app-sidebar {
        width: 260px;
      }

      ::ng-deep .app-sidebar.p-sidebar-active ~ .main-content {
        margin-left: 0;
      }

      .sidebar-header {
        padding: 1rem;
      }

      .logo {
        font-size: 1rem;
      }

      .logo i {
        font-size: 1.5rem;
      }

      .nav-item {
        padding: 0.875rem 1.25rem;
        font-size: 0.95rem;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = true;
  currentPageTitle: string = 'Dashboard';

  menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Araçlar',
      icon: 'pi pi-car',
      routerLink: '/vehicles'
    },
    {
      label: 'Abonelikler',
      icon: 'pi pi-id-card',
      routerLink: '/subscriptions'
    },
    {
      label: 'Ödemeler',
      icon: 'pi pi-money-bill',
      routerLink: '/payments'
    },
    {
      label: 'Otopark Durumu',
      icon: 'pi pi-map-marker',
      routerLink: '/parking-status'
    },
    {
      label: 'Raporlar',
      icon: 'pi pi-chart-bar',
      routerLink: '/reports'
    },
    {
      label: 'Bildirimler',
      icon: 'pi pi-bell',
      routerLink: '/notifications'
    },
    {
      label: 'Geçmiş',
      icon: 'pi pi-history',
      routerLink: '/history'
    },
    {
      label: 'QR Kod',
      icon: 'pi pi-qrcode',
      routerLink: '/qr-code'
    },
    {
      label: 'Rezervasyonlar',
      icon: 'pi pi-calendar',
      routerLink: '/reservations'
    },
    {
      label: 'Kullanıcılar',
      icon: 'pi pi-users',
      routerLink: '/users'
    },
    {
      label: 'Ayarlar',
      icon: 'pi pi-cog',
      routerLink: '/settings'
    }
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    // Giriş kontrolü
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && this.router.url !== '/login') {
      this.router.navigate(['/login']);
      return;
    }

    // Login sayfasında sidebar'ı başlangıçta gizle
    if (this.router.url === '/login') {
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentPath = event.urlAfterRedirects;
        
        // Login sayfasında sidebar'ı gizle
        if (currentPath === '/login') {
          this.sidebarVisible = false;
          return;
        }

        const item = this.menuItems.find(m => m.routerLink === currentPath);
        this.currentPageTitle = item ? item.label : 'Otopark Yönetim';
        this.sidebarVisible = true;
      });
    
    // İlk yüklemede başlığı ayarla
    const currentPath = this.router.url;
    if (currentPath !== '/login') {
      const item = this.menuItems.find(m => m.routerLink === currentPath);
      this.currentPageTitle = item ? item.label : 'Dashboard';
    }
  }

  getCurrentPageTitle(): string {
    return this.currentPageTitle;
  }

  closeSidebarOnMobile() {
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
      this.sidebarVisible = false;
    }
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'Kullanıcı';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
