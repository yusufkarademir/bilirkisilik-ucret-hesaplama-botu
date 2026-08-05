# Tüketici Hakem Heyetleri — Bilirkişilik Ücret Hesaplama Robotu

Tüketici hakem heyetlerinde görev alan bilirkişilerin rapor başına alacakları ücreti hesaplayan,
tek dosyalık bir web aracı. Harici bağımlılığı yoktur; `index.html` dosyasını tarayıcıda açmanız yeterlidir.

## Hesaplama esası

Ücret, Ticaret Bakanlığınca yayımlanan **Tüketici Hakem Heyetleri Bilirkişilik Ücret Tarifesi**'ne dayanır.
Tarife tutarları TL olarak değil **gösterge** olarak belirler:

```
Brüt ücret = Uygulanan gösterge × Memur aylık katsayısı
```

- Tarife 1/1/2021 tarihinde yürürlüğe girmiştir. Gösterge değerleri yıllık olarak değişmez;
  ödenen tutar, memur aylık katsayısı her Ocak ve Temmuz'da güncellendikçe kendiliğinden artar.
- Uyuşmazlığın niteliği, dosyanın kapsamı, bilirkişinin vasfı veya ilgili uzmanlık alanında bilirkişi
  temininde yaşanan güçlük dikkate alınarak gösterge sayısı **en fazla 500** artırılabilir.
- İnceleme başına toplam brüt ücret **3.000 göstergeyi** aşamaz.

## Vergilendirme

Bilirkişilere yapılan ödemeler **GVK md. 61 uyarınca ücret sayılır**. Buna göre:

| Kalem | Uygulama |
|---|---|
| Gelir vergisi stopajı | GVK md. 103 ücret tarifesi — araçta varsayılan ilk dilim (%15) |
| Damga vergisi | Ücret ödemelerinde binde 7,59 |
| KDV | **Hesaplanmaz.** Yalnızca faaliyeti nedeniyle KDV mükellefi olan bilirkişiler için isteğe bağlı olarak eklenebilir |

**Asgari ücret istisnası:** 1/1/2022'den itibaren ücret sayılan ödemelerin aylık brüt asgari ücrete
isabet eden kısmı gelir vergisinden ve damga vergisinden istisnadır. Bir bilirkişi ücreti tek başına brüt
asgari ücretin çok altında kaldığından, aynı ödeyiciden o ay başka ücret geliriniz yoksa kesinti
yapılmaması beklenir; kaynakta kesinti yapılmışsa iade talep edilebilir. Bu nedenle araç sonucu iki satır
hâlinde gösterir: *kesinti yapılırsa* ve *istisna uygulanırsa* net tutar.

## Özellikler

- 249 ürün/hizmet kategorisi, Türkçe sıralama ve anlık arama
- Gösterge artırımı girişi ve 3.000 gösterge tavanı uyarısı
- Yürürlükteki memur aylık katsayısını tek tuşla uygulama; başka dönemler için elle giriş
- Girdilerin tarayıcıda saklanması (`localStorage`)
- Sonucu panoya kopyalama, yazdırma / PDF çıktısı
- Mobil uyumlu, erişilebilir işaretleme, `prefers-reduced-motion` desteği
- **Kurulabilir uygulama (PWA):** ana ekrana eklenir, kendi ikonuyla tam ekran açılır,
  internet olmadan da çalışır

## Yayına alma (ücretsiz)

Proje bağımlılığı olmayan statik dosyalardan oluşur; derleme adımı yoktur. Bu nedenle
herhangi bir statik barındırma hizmetinde ücretsiz yayınlanabilir.

### GitHub Pages (önerilen — repo zaten GitHub'da)

`Settings → Pages → Source: Deploy from a branch → main / (root)` seçilir. Birkaç dakika
içinde site şu adreste yayına girer:

```
https://yusufkarademir.github.io/bilirkisilik-ucret-hesaplama-botu/
```

`main` dalına her push sonrası site kendiliğinden güncellenir. HTTPS varsayılan olarak
açıktır; PWA'nın çalışması için bu gereklidir.

### Alternatifler

| Hizmet | Kurulum | Not |
|---|---|---|
| Cloudflare Pages | Repoyu bağla, build komutu boş, çıktı dizini `/` | Ücretsiz plan sınırsız bant genişliği |
| Netlify | Repoyu bağla veya klasörü sürükle-bırak | Sürükle-bırak ile 30 saniyede yayında |
| Vercel | Repoyu bağla, framework `Other` | Ücretsiz plan kişisel kullanım için yeterli |

Özel alan adı bağlamak isterseniz üçü de ücretsiz destekler (alan adının kendi bedeli hariç).

## Uygulama olarak kurma

Site HTTPS üzerinden açıldığında kurulabilir hâle gelir:

- **Android / Chrome:** sayfadaki "Uygulama olarak yükle" butonu veya menüden *Ana ekrana ekle*
- **iOS / Safari:** Paylaş → *Ana Ekrana Ekle*
- **Masaüstü Chrome / Edge:** adres çubuğundaki kurulum simgesi

Kurulduktan sonra tarayıcı arayüzü olmadan, kendi ikonuyla ve çevrimdışı çalışır.

> **Not:** Hesaplama mantığını veya katsayıyı değiştirdiğinizde `sw.js` içindeki `SURUM`
> değerini artırın (`v2` → `v3`). Aksi hâlde kullanıcıların cihazındaki önbellekte eski
> sürüm kalabilir.

## Katsayı güncelleme

Hazine ve Maliye Bakanlığı yeni dönem genelgesini yayımladığında `index.html` içindeki iki satırı
güncellemek yeterlidir:

```js
const GUNCEL_KATSAYI = 1.575512;
const GUNCEL_DONEM = '1 Temmuz – 31 Aralık 2026';
```

Şu an gömülü değer **1 Temmuz – 31 Aralık 2026** dönemine (aylık katsayı **1,575512**) aittir.

## Kaynaklar

- [Ticaret Bakanlığı — Tüketici Hakem Heyetleri Bilirkişilik Ücret Tarifesi](https://tuketici.ticaret.gov.tr/duyurular/tuketici-hakem-heyetleri-bilirkisilik-ucret-tarifesi)
- [Tüketici Hakem Heyetleri Bilirkişilik Yönetmeliği (mevzuat.gov.tr)](https://www.mevzuat.gov.tr/File/GeneratePdf?mevzuatNo=34683&mevzuatTur=KurumVeKurulusYonetmeligi&mevzuatTertip=5)
- [Hazine ve Maliye Bakanlığı — Mali ve Sosyal Haklara İlişkin Genelgeler](https://ms.hmb.gov.tr/)

## Yasal uyarı

Sunulan veriler bilgilendirme amaçlıdır; mali veya hukuki danışmanlık niteliği taşımaz ve kesin ödeme
tutarını garanti etmez. Kesintilerin nihai tutarı, ödemeyi yapan idarenin uygulamasına ve ilgili ayki
kümülatif vergi matrahınıza göre değişir. Resmî işlemler için güncel mevzuatı ve ilgili kurumun
uygulamasını teyit ediniz.
