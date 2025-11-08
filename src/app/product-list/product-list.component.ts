import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from './product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  globalFilter: string = '';
  selectedProducts: Product[] = [];

  ngOnInit() {
    // Daha fazla örnek veri
    this.products = [
      { id: 1, name: 'Laptop Dell XPS 15', category: 'Elektronik', price: 25000, stock: 15 },
      { id: 2, name: 'Gaming Mouse Logitech', category: 'Aksesuar', price: 450, stock: 120 },
      { id: 3, name: 'Mekanik Klavye RGB', category: 'Aksesuar', price: 1200, stock: 65 },
      { id: 4, name: '4K Monitör 27"', category: 'Elektronik', price: 5500, stock: 30 },
      { id: 5, name: 'Kablosuz Kulaklık', category: 'Aksesuar', price: 1500, stock: 85 },
      { id: 6, name: 'Webcam HD 1080p', category: 'Aksesuar', price: 800, stock: 45 },
      { id: 7, name: 'Tablet iPad Pro', category: 'Elektronik', price: 18000, stock: 20 },
      { id: 8, name: 'Akıllı Telefon', category: 'Elektronik', price: 22000, stock: 40 },
      { id: 9, name: 'SSD 1TB NVMe', category: 'Donanım', price: 2000, stock: 100 },
      { id: 10, name: 'RAM 16GB DDR4', category: 'Donanım', price: 1200, stock: 75 },
      { id: 11, name: 'Ekran Kartı RTX 4070', category: 'Donanım', price: 18000, stock: 12 },
      { id: 12, name: 'Anakart B550', category: 'Donanım', price: 3500, stock: 25 },
      { id: 13, name: 'Güç Kaynağı 750W', category: 'Donanım', price: 2500, stock: 35 },
      { id: 14, name: 'Kasa RGB', category: 'Donanım', price: 1800, stock: 50 },
      { id: 15, name: 'Soğutucu Sıvı', category: 'Donanım', price: 3000, stock: 18 }
    ];
    this.filteredProducts = this.products;
  }

  getSeverity(stock: number): 'success' | 'warning' | 'danger' {
    if (stock > 50) return 'success';
    if (stock > 20) return 'warning';
    return 'danger';
  }

  getStockLabel(stock: number): string {
    if (stock > 50) return 'Stokta Var';
    if (stock > 20) return 'Az Stok';
    return 'Kritik Stok';
  }

  getTotalStock(): number {
    return this.filteredProducts.reduce((sum, p) => sum + p.stock, 0);
  }

  getTotalValue(): number {
    return this.filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  }

  clearFilters() {
    this.globalFilter = '';
    this.filteredProducts = this.products;
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter = value;
    
    if (!value) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase()) ||
      product.id.toString().includes(value)
    );
  }
}

