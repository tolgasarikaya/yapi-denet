# Yapı Denetim Platformu

Yapı Denetim Platformu, Türkiye genelindeki yapı denetim faaliyetlerini takip etmeyi, bölgesel raporlara ulaşmayı ve binaların denetim süreçlerini yönetmeyi sağlayan modern bir web uygulamasıdır.

<a href="https://yapi-denet.vercel.app/">Live Demo</a>

## 🌟 Özellikler

- **Harita Tabanlı İzleme**: Türkiye genelinde illere göre yapı denetim verilerini interaktif harita üzerinden görüntüleme
- **Detaylı İl Raporları**: Her il için detaylı istatistikler, denetçi bilgileri ve yapı denetim kuruluşu verileri
- **Gelişmiş Veri Filtreleme**: Tüm tablolarda arama, filtreleme ve sıralama özellikleri
- **Optimize Edilmiş Performans**: Veri önbelleğe alma ve lazy loading ile optimize edilmiş kullanıcı deneyimi
- **Responsive Tasarım**: Mobil ve masaüstü cihazlarda sorunsuz kullanım

## 🔧 Kullanılan Teknolojiler

### Frontend
- **[Next.js 15](https://nextjs.org/)**: React tabanlı web çatısı, sayfa yönlendirme ve optimizasyon
- **[React 19](https://react.dev/)**: Kullanıcı arayüzü geliştirme kütüphanesi
- **[TypeScript](https://www.typescriptlang.org/)**: Tip güvenliği ve geliştirici deneyimi için
- **[Tailwind CSS](https://tailwindcss.com/)**: Hızlı ve özelleştirilebilir CSS çatısı
- **[shadcn/ui](https://ui.shadcn.com/)**: Kullanılabilir ve özelleştirilebilir UI bileşenleri

### Entegrasyonlar ve Harita
- **[Leaflet](https://leafletjs.com/)** ve **[React Leaflet](https://react-leaflet.js.org/)**: İnteraktif haritalar için
- **[AG Grid](https://www.ag-grid.com/)**: Gelişmiş tablo yönetimi ve veri görselleştirme

### Veri Yönetimi ve State
- **[TanStack Query](https://tanstack.com/query)**: Sunucu state yönetimi, veri getirme ve önbelleğe alma
- **[Axios](https://axios-http.com/)**: HTTP istekleri için gelişmiş istemci

### Kimlik Doğrulama
- **[Clerk](https://clerk.com/)**: Güvenli kullanıcı kimlik doğrulaması ve yönetimi

### Diğer
- **[Lucide React](https://lucide.dev/guide/packages/lucide-react)**: Minimalist ikon seti
- **[Class Variance Authority (CVA)](https://cva.style/docs)**: Bileşen varyantları için
- **[clsx](https://github.com/lukeed/clsx)** ve **[tailwind-merge](https://github.com/dcastil/tailwind-merge)**: Koşullu sınıf adı yönetimi

## 📋 Ön Gereksinimler

Projeyi yerel makinenizde çalıştırmak için aşağıdaki yazılımların yüklü olması gerekmektedir:

- **Node.js**: v18.17.0 veya daha yeni
- **npm**: v9.6.0 veya daha yeni

## 🚀 Kurulum ve Çalıştırma

### 1. Projeyi Klonlama

```bash
git clone https://github.com/username/yapi-denetim-sistemi.git
cd yapi-denetim-sistemi
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Geliştirme Ortamını Başlatma

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### 4. Üretim Sürümünü Oluşturma ve Çalıştırma

```bash
npm run build
npm run start
```

## 🌐 API Entegrasyonu

Uygulama, merkezi bir API hizmetine bağlanarak yapı denetim verilerini çekmektedir. API istekleri, `src/services/api` klasöründeki modüller aracılığıyla gerçekleştirilir ve TanStack Query ile ön belleğe alınır.

## 📁 Proje Yapısı

```
├── public/               # Statik dosyalar (resimler, fontlar vb.)
├── src/
│   ├── app/              # Next.js uygulama yapısı ve sayfalar
│   ├── components/       # React bileşenleri
│   │   ├── common/       # Genel amaçlı bileşenler
│   │   ├── layout/       # Layout bileşenleri
│   │   ├── tables/       # Tablo bileşenleri
│   │   └── turkey-map/   # Harita bileşenleri
│   ├── constants/        # Sabit değerler ve konfigürasyonlar
│   ├── hooks/            # Özel React hook'ları
│   ├── lib/              # Yardımcı fonksiyonlar ve servisler
│   ├── services/         # API servisleri
│   │   └── api/          # API bağlantıları
│   ├── styles/           # Global CSS ve stil modülleri
│   └── types/            # TypeScript tip tanımlamaları
```

## 🧩 Uygulama Yapısı

### Mimari Tasarım

Bu proje, temiz kod prensiplerine, modülerliğe ve bakım yapılabilirliğe odaklanarak geliştirilmiştir:

- **Bileşen Tabanlı Geliştirme**: Uygulamanın her parçası, yeniden kullanılabilir bileşenler olarak tasarlanmıştır
- **Tip Güvenliği**: TypeScript ile tam tip güvenliği sağlanmıştır
- **İleri Düzey Veri Yönetimi**: TanStack Query ile etkin sunucu durumu yönetimi
- **Sabit Değerlerin Merkezileştirilmesi**: Tüm yapılandırma değerleri ve sabitler, constants klasöründe toplanmıştır
- **Temiz Kod Prensipleri**: Kod tekrarlarının önlenmesi (DRY) ve tek sorumluluk prensibi (SRP) uygulanmıştır

### Uygulama Özellikleri

- **İnteraktif Türkiye Haritası**: İllere tıklayarak detaylı yapı denetim verilerine erişim
- **Çoklu Tablo Görünümleri**: Her il için farklı kategorilerde veri tabloları
- **Gelişmiş Filtreleme ve Arama**: AG Grid entegrasyonu ile güçlü veri manipülasyonu
- **Responsive UI**: Her ekran boyutunda optimum kullanıcı deneyimi
- **Hızlı Veri Erişimi**: TanStack Query ile önbelleğe alma ve veri yenileme stratejileri

## 🔒 Kimlik Doğrulama

Uygulama, Clerk ile güvenli kimlik doğrulama sağlar. Geliştirme ortamında kullanmak için:

1. [Clerk Dashboard](https://dashboard.clerk.com/)'dan bir hesap oluşturun
2. Yeni bir uygulama oluşturun
3. API anahtarlarını alın ve `.env.local` dosyasına ekleyin:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## 🛠️ Geliştirme

### Yeni Özellik Ekleme

Yeni bir özellik eklemek için:

1. İlgili bileşeni `src/components` klasöründe oluşturun
2. Gerekirse yeni tipleri `src/types` klasöründe tanımlayın
3. API entegrasyonu gerekiyorsa, ilgili servisi `src/services/api` klasöründe oluşturun
4. Bileşeni sayfada kullanın

### Stil Yönetimi

Uygulama, Tailwind CSS kullanarak stillendirilmiştir:

- Genel stiller: `src/app/globals.css`
- Bileşene özel stiller: CSS Modules ile `ComponentName.module.css` dosyalarında
- Utility sınıfları: `src/lib/utils.ts` içinde `cn()` fonksiyonu


## 📈 Performans Optimizasyonu

Uygulama, aşağıdaki stratejilerle optimize edilmiştir:

- **Kod Bölme**: Next.js'in otomatik kod bölme özelliği
- **Lazy Loading**: Harita ve tablo bileşenleri için
- **Veri Önbelleğe Alma**: TanStack Query ile API isteklerinin optimize edilmesi
- **Memoization**: `useMemo` ve `useCallback` ile gereksiz yeniden render'ların önlenmesi
- **Image Optimization**: Next.js'in yerleşik görüntü optimizasyonu

## 👨‍💻 Geliştirici

Email: (tolga.sarikaya.dev@gmail.com)

---

Geliştirici: [Tolga SARIKAYA](https://github.com/tolgasarikaya)
