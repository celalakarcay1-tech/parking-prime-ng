import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { PaymentsComponent } from './payments/payments.component';
import { ParkingStatusComponent } from './parking-status/parking-status.component';
import { ReportsComponent } from './reports/reports.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'parking-status', component: ParkingStatusComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'qr-code', component: QrCodeComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'users', component: UsersComponent }
];

