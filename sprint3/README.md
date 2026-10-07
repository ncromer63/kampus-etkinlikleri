https://kampus-etkinlikleri-seven.vercel.app/

# Kampüs Etkinlikleri - Sprint 3

Bu proje, Kampüs Etkinlikleri uygulamasının JavaScript ve DOM manipülasyonu ile dinamik hale getirilmiş sürümüdür.

## Yapılan Geliştirmeler (Sprint 3)
1. **data.js**: En az 6 etkinlik nesnesi içeren modüler veri yapısı oluşturuldu.
2. **event-list.js**:
   - Etkinlik kartları JavaScript ile dinamik üretildi.
   - Ana sayfada (`data-limit="2"`) yaklaşan en yakın 2 etkinlik listelendi.
   - Etkinlikler sayfasında arama kutusu ve kategori filtresi (Set ile tekil üretilen kategoriler) dinamik bağlandı.
   - Türkçe karakter duyarlı arama (`toLocaleLowerCase("tr-TR")`) ve sonuç sayısı bilgilendirmesi eklendi.
3. **event-detail.js**:
   - `?id=` parametresi URL'den okunarak ilgili etkinliğin künyesi, afişi ve detayları render edildi.
   - Geçersiz veya bulunamayan id durumunda konsol hatası vermeden kırmızı hata kutusu ve listeye dönüş butonu gösterildi.
4. **event-form.js**:
   - `etkinlik-ekle.html` ve `etkinlik-guncelle.html` için ortak form yönetim modülü geliştirildi.
   - Tarayıcının varsayılan balonları kapatılıp (`novalidate`), özel JavaScript doğrulaması (ad >= 3 karakter, zorunlu alanlar, 1-1000 kontenjan aralığı vb.) ve `aria-invalid` erişilebilirlik nitelikleri uygulandı.
   - Güncelleme modunda form alanları ilgili etkinlik verileriyle otomatik dolduruldu, id'siz erişimlerde uyarı kutusu gösterildi.
   - Hata yoksa oluşturulan / güncellenen veri nesnesi yeşil kutuda JSON olarak görüntülendi.

## Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
