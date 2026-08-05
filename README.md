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
