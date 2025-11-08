import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TagModule,
    DropdownModule,
    PasswordModule,
    TooltipModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayDialog: boolean = false;
  user: User = this.getEmptyUser();
  isEditMode: boolean = false;
  password: string = '';
  searchTerm: string = '';
  
  roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Operatör', value: 'operator' },
    { label: 'Görüntüleyici', value: 'viewer' }
  ];

  statusOptions = [
    { label: 'Aktif', value: 'active' },
    { label: 'Pasif', value: 'inactive' }
  ];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const now = new Date();
    this.users = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@otopark.com',
        phone: '0532 123 4567',
        role: 'admin',
        status: 'active',
        createdAt: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
        lastLogin: new Date(now.getTime() - 1 * 60 * 60 * 1000)
      },
      {
        id: 2,
        username: 'operator1',
        email: 'operator1@otopark.com',
        phone: '0533 987 6543',
        role: 'operator',
        status: 'active',
        createdAt: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000),
        lastLogin: new Date(now.getTime() - 5 * 60 * 60 * 1000)
      },
      {
        id: 3,
        username: 'viewer1',
        email: 'viewer1@otopark.com',
        phone: '0542 555 1234',
        role: 'viewer',
        status: 'active',
        createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
        lastLogin: new Date(now.getTime() - 24 * 60 * 60 * 1000)
      }
    ];
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      !this.searchTerm ||
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm)
    );
  }

  openNew() {
    this.user = this.getEmptyUser();
    this.password = '';
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.password = '';
    this.isEditMode = true;
    this.displayDialog = true;
  }

  saveUser() {
    if (this.isEditMode) {
      const index = this.users.findIndex(u => u.id === this.user.id);
      if (index !== -1) {
        this.users[index] = { ...this.user };
      }
    } else {
      this.user.id = this.users.length + 1;
      this.user.createdAt = new Date();
      this.users.push({ ...this.user });
    }
    this.filterUsers();
    this.displayDialog = false;
    this.user = this.getEmptyUser();
    this.password = '';
  }

  deleteUser(user: User) {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.filterUsers();
    }
  }

  toggleStatus(user: User) {
    user.status = user.status === 'active' ? 'inactive' : 'active';
    this.filterUsers();
  }

  getEmptyUser(): User {
    return {
      id: 0,
      username: '',
      email: '',
      phone: '',
      role: 'viewer',
      status: 'active',
      createdAt: new Date()
    };
  }

  getRoleSeverity(role: string): 'success' | 'warning' | 'danger' | 'info' {
    switch (role) {
      case 'admin': return 'danger';
      case 'operator': return 'warning';
      case 'viewer': return 'info';
      default: return 'success';
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'Admin';
      case 'operator': return 'Operatör';
      case 'viewer': return 'Görüntüleyici';
      default: return 'Bilinmiyor';
    }
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    return status === 'active' ? 'success' : 'danger';
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Aktif' : 'Pasif';
  }
}

