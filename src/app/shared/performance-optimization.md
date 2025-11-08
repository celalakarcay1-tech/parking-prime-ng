# Performans Optimizasyonları

## Büyük Veri Setleri İçin Öneriler

### 1. Virtual Scrolling
- 1000'den fazla kayıt için otomatik aktif
- Sadece görünen satırları render eder
- Bellek kullanımını minimize eder

### 2. Pagination
- Varsayılan: 10 kayıt/sayfa
- Seçenekler: 5, 10, 25, 50, 100
- Büyük veri setleri için 25-50 önerilir

### 3. Debounced Filtering
- 1000'den fazla kayıt için 300ms gecikme
- Gereksiz filtreleme işlemlerini önler

### 4. Lazy Loading (Gelecek Geliştirme)
- Server-side pagination
- API'den sayfa sayfa veri çekme
- Infinite scroll desteği

### 5. IndexedDB (Gelecek Geliştirme)
- Tarayıcıda veri saklama
- Offline çalışma desteği
- Hızlı arama ve filtreleme

