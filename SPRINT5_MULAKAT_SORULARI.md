# Sprint 5 — React Bileşenleri: Mülakat & Sözlü Soru-Cevap Rehberi

Bu belge; hocanızın kod incelemesi, jüri veya sunum esnasında sorabileceği **mimari**, **mantık**, **kodlama** ve **React/TypeScript** sorularına karşı hazırlıklı olmanız için hazırlanmıştır.

---

## 1. Mimari & Genel Tasarım Soruları

### S1: Sprint 4'te çalışan tek büyük bir `App.tsx` varken neden Sprint 5'te bileşenlere (components) böldük?
* **Cevap:** 
  * **Modülerlik ve Sürdürülebilirlik:** Tek dosyada 370 satır kod olması; bir hata olduğunda bulmayı, geliştirmeyi ve ekip çalışmasını zorlaştırır. Parçalara bölerek sorumlulukları ayırdık (*Single Responsibility Principle*).
  * **Tekrar Kullanılabilirlik (Reusability):** Örneğin `EventList` bileşenini hem **Ana Sayfa**'da (yaklaşan 2 etkinlik) hem de **Etkinlikler** sayfasında (tüm filtrelenmiş etkinlikler) aynı kodla tekrar kullanabiliyoruz.
  * **Okunabilirlik:** `App.tsx` artık sadece sayfa state'lerini ve üst seviye akışı yöneten, ~80-100 satırlık temiz bir orkestra şefi haline geldi.

---

### S2: React'te "Veri Aşağı, Olay Yukarı" (Data Down, Actions/Events Up) ne demektir? Projenden örnek verir misin?
* **Cevap:**
  * **Veri Aşağı (Props):** Üst bileşen (`App`), alt bileşene (`Navigation`, `Header`, `EventCard`) ihtiyacı olan veriyi **props** olarak tek yönlü indirir (*One-way data flow*).
  * **Olay Yukarı (Callback):** Alt bileşende bir etkileşim olduğunda (örneğin menü linkine veya "Detayları gör" butonuna tıklandığında), alt bileşen state'i doğrudan kendisi değiştirmez; üst bileşenin ona geçtiği fonksiyonu (callback) çağırarak durumu yukarıya haber verir.
  * **Örnek:** `Navigation` bileşenine `current={page}` verisi iner; kullanıcı bir sekmeye tıkladığında `onNavigate(item.name)` çağrılarak `App`'teki `go()` / `setPage()` fonksiyonu tetiklenir.

---

### S3: "Lifting State Up" (State'i Yukarı Taşımak) nedir? Neden `searchText` ve `category` state'lerini `EventFilter` içinde tutmadık?
* **Cevap:**
  * Çünkü arama metnine ve seçilen kategoriye sadece filtre kutusu (`EventFilter`) değil, filtreleme sonucunu gösterecek olan liste (`EventList` / `filtered`) de ihtiyaç duyar.
  * İki kardeş bileşenin aynı veriye ihtiyacı varsa, o state onların en yakın ortak üst bileşenine taşınır. Bu üst bileşen `App`'tir.
  * `App`, `searchText` ve `category` değerlerini `EventFilter`'a props olarak verir; `EventFilter` kutudaki değişimi `onSearchChange` ve `onCategoryChange` ile `App`'e iletir. `App` bu state'lere göre listeyi filtreleyip `EventList`'e yollar.

---

## 2. Kod & Teknik Detay Soruları

### S4: `EventList` bileşeninde `events.map()` yaparken `key` olarak neden `event.id` kullandın? `index` (0, 1, 2...) kullansaydın ne olurdu?
* **Cevap:**
  * React, hangi elemanın eklendiğini, silindiğini veya yer değiştirdiğini sanal DOM (Virtual DOM) üzerinde `key` değeriyle takip eder.
  * Kullanıcı arama yaptığında veya kategori filtrelediğinde liste elemanlarının sırası ve sayısı dinamik olarak değişir. Eğer `index` (`key={i}`) kullanılsaydı, filtre değiştiğinde React yanlış elemanları yeniden boyar veya state karışıklığına sebep olurdu (*re-render performans ve UI hataları*).
  * Bu yüzden her zaman benzersiz ve sabit olan `event.id`'yi key olarak verdik.

---

### S5: `EventCard`'ın içindeki `<article>` etiketinden `key`'i neden sildin?
* **Cevap:**
  * Çünkü `key`, döngünün (`map`) döndüğü yerde bulunmalıdır.
  * `EventCard` tek bir kart çizen bağımsız bir bileşendir; kendi başına döngünün içinde olduğunu bilmemelidir. Listeyi dönen bileşen `EventList` olduğu için `key={event.id}` prop'u `EventList.tsx` içinde `<EventCard key={event.id} ... />` şeklinde verilir.

---

### S6: `EventDetail`'a gidildiğinde sayfa başlığı ve tarayıcı sekmesi nasıl dinamik değişiyor?
* **Cevap:**
  * `App.tsx`'te seçilen etkinliğin id'si `selectedId` state'inde tutulur.
  * `findEventById(events, selectedId)` fonksiyonu ile ilgili etkinlik nesnesi (`selected`) bulunur.
  * Sayfa `"detail"` ise `headerTitle` ve `pageTitle` doğrudan `selected.title` yapılır.
  * `useEffect` kancası (`hook`), `pageTitle` her değiştiğinde `document.title = \`Kampüs Etkinlikleri — ${pageTitle}\`` satırını çalıştırarak tarayıcı sekmesini anında günceller.
  * `Header` bileşenine de `title={headerTitle}` prop'u geçilerek yeşil çubukta etkinliğin adı (örneğin *Kariyer Günleri 2026*) yazdırılır.

---

### S7: Neden her bileşenin props tipini TypeScript'te `interface` ile yazdın?
* **Cevap:**
  * **Tip Güvenliği (Type Safety):** Bileşene yanlış veya eksik prop gönderildiğinde kod derlenmeden önce (IDE'de ve `npm run build` esnasında) hata verir.
  * **Açık ve Okunabilir Sözleşme (Contract):** O bileşeni kullanan başka bir geliştirici, bileşenin hangi verileri zorunlu (`title: string`), hangilerini isteğe bağlı (`text?: string`) beklediğini ve hangi callback fonksiyonlarını aldığını anında görür.

---

### S8: `export default` ile `named export` (adlandırılmış dışa aktarma) farkı nedir? Projede nasıl kullandın?
* **Cevap:**
  * **Named Export (`export function formatDate`, `export type PageName`):** Bir dosyadan birden fazla fonksiyon veya tip dışarı aktarılacaksa kullanılır. Süslü parantez ile import edilir (`import { formatDate } from "..."`).
  * **Default Export (`export default EventCard`):** Dosyanın ana çıktısı tek bir bileşen olduğunda tercih edilir. Slaytlardaki kural gereği her bileşen dosyasının sonunda tek bir `export default <BileşenAdı>` kullandık.

---

### S9: `EventForm` bileşeni hem Ekle hem Güncelle sayfasında kullanılıyor. Bu sprintte `onSubmit` ne iş yapıyor?
* **Cevap:**
  * Bu sprintte form sadece görünüm aşamasındadır; gerçek veritabanı/state kaydı Sprint 6'da yapılacaktır.
  * `EventForm` içinde form gönderildiğinde önce `e.preventDefault()` çağrılarak sayfanın tarayıcı tarafından tam yenilenmesi (refresh) engellenir.
  * Ardından `App`'ten gelen `onSubmit()` callback'i çağrılır. `App.tsx` içinde bu prop'a `() => window.scrollTo(0, 0)` verilmiştir; böylece kullanıcı kaydet butonuna bastığında sayfa yenilenmeden en üste yumuşakça kayar.

---

### S10: "Fragment" (`<> ... </>`) nedir ve nerede kullandık?
* **Cevap:**
  * React'te her bileşenin render fonksiyonu **tek bir kök (root) düğüm** döndürmek zorundadır.
  * DOM'a fazladan gereksiz bir `<div>` ekleyip CSS ızgarasını (grid/flex) bozmamak için React Fragment (`<> ... </>`) kullanılır.
  * Örneğin `App.tsx`'in `return` kısmında `Header`, `Navigation`, `main` ve `Footer`'ı sarmak için ve sayfa bloklarında kardeş elemanları sarmak için kullandık.

---

### S11: `App.css`'te veya ekranda Sprint 4'e göre herhangi bir görsel kayma oldu mu?
* **Cevap:**
  * Hayır. Sprint'in altın kuralı olan *"Görünüm değişmemeli, değişen kodun içi"* kuralına %100 uyuldu.
  * Tüm renkler, yeşil gradyan menü çubuğu, butonların hover durumları, 2 sütunlu kart ızgarası ve detay sayfasındaki afiş/künye düzeni Sprint 4 ile pikseli pikseline birebir aynıdır.
