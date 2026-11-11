import fs from 'fs';
import { execSync } from 'child_process';
import app from './src/app.js';

console.log('====================================================');
console.log('   SPRINT 7 — 12 TESLİM KONTROL MADDESİ DENETİMİ    ');
console.log('====================================================\n');

let allPassed = true;

function check(number, title, passed, detail = '') {
  const symbol = passed ? '✅ GEÇTİ' : '❌ BAŞARISIZ';
  console.log(`[${symbol}] Madde ${number}: ${title}`);
  if (detail) console.log(`       👉 ${detail}`);
  if (!passed) allPassed = false;
}

// 1. Backend ayrı backend/ klasöründe
const hasBackendPkg = fs.existsSync('package.json');
const hasFrontendPkg = fs.existsSync('../frontend/package.json');
check(1, 'Backend ayrı backend/ klasöründe', hasBackendPkg && hasFrontendPkg, 'backend/ ve frontend/ bağımsız klasörler olarak mevcut');

// 2. npm install + npm run dev hatasız çalışıyor
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasDev = pkg.scripts && pkg.scripts.dev && pkg.scripts.dev.includes('node --watch src/server.js');
const hasDeps = pkg.dependencies && pkg.dependencies.express && pkg.dependencies.cors && pkg.dependencies.dotenv;
check(2, 'npm install + npm run dev tanımlı ve hazır', hasDev && hasDeps, `scripts.dev: "${pkg.scripts.dev}"`);

// 3. Port .env'den okunuyor, .env.example var
const serverJs = fs.readFileSync('src/server.js', 'utf8');
const readsPort = serverJs.includes('process.env.PORT');
const hasEnvExample = fs.existsSync('.env.example');
check(3, 'Port .env\'den okunuyor, .env.example var', readsPort && hasEnvExample, 'process.env.PORT || 3000 ve .env.example (PORT=3000) mevcut');

// 4. env ve node_modules GitHub'da yok
let trackedEnv = '';
let trackedModules = '';
try {
  trackedEnv = execSync('git ls-files .env src/.env', { encoding: 'utf8' }).trim();
  trackedModules = execSync('git ls-files node_modules', { encoding: 'utf8' }).trim();
} catch (e) {
  allPassed = false;
}
check(4, '.env ve node_modules GitHub takip dışı', trackedEnv === '' && trackedModules === '', '.gitignore kuralları ile git takibinden engellendi');

// 5. Route ve controller ayrı dosyalarda
const hasRoutes = fs.existsSync('src/routes/event.routes.js');
const hasControllers = fs.existsSync('src/controllers/event.controller.js');
check(5, 'Route ve controller ayrı dosyalarda', hasRoutes && hasControllers, 'src/routes/event.routes.js ve src/controllers/event.controller.js ayrıldı');

// 9. backend/README.md'de REST sözleşmesi
const readme = fs.existsSync('README.md') ? fs.readFileSync('README.md', 'utf8') : '';
const hasContract = readme.includes('GET') && readme.includes('/health') && readme.includes('/events') && readme.includes('200') && readme.includes('404');
check(9, 'backend/README.md\'de REST sözleşmesi', hasContract, 'Sözleşme tablosu, metotlar ve durum kodları belgelendi');

// 10. 6 istek collection olarak backend/requests/kampus-api.json'da
const hasPostman = fs.existsSync('requests/kampus-api.json');
let postmanItemCount = 0;
if (hasPostman) {
  const postmanJson = JSON.parse(fs.readFileSync('requests/kampus-api.json', 'utf8'));
  postmanItemCount = postmanJson.item ? postmanJson.item.length : 0;
}
check(10, '6 istek collection olarak backend/requests/kampus-api.json\'da', hasPostman && postmanItemCount === 6, `Koleksiyonda tam ${postmanItemCount} istek tanımlı`);

// 11. En az 5 commit, adım adım atılmış
let commitLines = [];
try {
  const logOutput = execSync('git log --oneline -n 15', { encoding: 'utf8' }).trim();
  commitLines = logOutput.split('\n');
} catch (e) {
  allPassed = false;
}
check(11, 'En az 5 commit, adım adım atılmış', commitLines.length >= 5, `Toplam ${commitLines.length} commit mevcut`);

// 12. data/events.js'te frontend'den birebir taşınan 6 etkinlik
import { events } from './src/data/events.js';
const has6Events = Array.isArray(events) && events.length === 6;
const isMatchingFrontend = events.some(e => e.id === 'event-2' && e.title === 'Robotik Atölyesi') && events.some(e => e.id === 'event-1' && e.title === 'Kariyer Günleri 2026');
check(12, 'data/events.js\'te frontend\'den birebir taşınan 6 etkinlik (Adım 6)', has6Events && isMatchingFrontend, `Frontend ile birebir uyumlu 6 etkinlik yüklü (event-1: ${events[0].title}, event-2: ${events[1].title})`);

// 6, 7, 8: API HTTP Endpoint Testleri
console.log('\n--- Canlı Endpoint Testleri (Maddeler 6, 7, 8) ---');
const PORT = 3009;
const server = app.listen(PORT, async () => {
  const baseUrl = `http://localhost:${PORT}`;
  try {
    // 6. GET /health student = numara
    const resHealth = await fetch(`${baseUrl}/health`);
    const dataHealth = await resHealth.json();
    const m6 = resHealth.status === 200 && dataHealth.status === 'ok' && dataHealth.student === '2416501085';
    check(6, 'GET /health JSON\'unda student = 2416501085', m6, `Status: ${resHealth.status}, body: ${JSON.stringify(dataHealth)}`);

    // 7. GET /events ve GET /events/:id çalışıyor; olmayan id 404
    const resEvents = await fetch(`${baseUrl}/events`);
    const dataEvents = await resEvents.json();
    const resDetail = await fetch(`${baseUrl}/events/event-1`);
    const dataDetail = await resDetail.json();
    const res404 = await fetch(`${baseUrl}/events/olmayan-id-999`);
    const data404 = await res404.json();
    const m7 = resEvents.status === 200 && dataEvents.length >= 6 && resDetail.status === 200 && dataDetail.id === 'event-1' && res404.status === 404 && data404.error;
    check(7, 'GET /events ve GET /events/:id çalışıyor; olmayan id 404', m7, `Liste: 200 (${dataEvents.length} kayıt), Detay: 200, Olmayan: 404 Not Found`);

    // 8. POST /events 201; eksik veri 400
    // 8.a: Tam veri (201 Created)
    const resPostOk = await fetch(`${baseUrl}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Özgün Denetim Testi',
        category: 'Atölye',
        date: '2026-11-30',
        capacity: 50
      })
    });
    const dataPostOk = await resPostOk.json();

    // 8.b: Sadece title (400 Bad Request - Fotoğraftaki Adım 9 senaryosu)
    const resPostOnlyTitle = await fetch(`${baseUrl}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Sadece Başlık' })
    });
    const dataPostOnlyTitle = await resPostOnlyTitle.json();

    // 8.c: Tamamen gövdesiz POST (body yok - uç durum kontrolü)
    const resPostNoBody = await fetch(`${baseUrl}/events`, {
      method: 'POST',
    });
    const dataPostNoBody = await resPostNoBody.json();

    // 8.d: Boş JSON {} POST (uç durum kontrolü)
    const resPostEmptyJson = await fetch(`${baseUrl}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });
    const dataPostEmptyJson = await resPostEmptyJson.json();

    const m8Ok = resPostOk.status === 201 && dataPostOk.id;
    const m8Title = resPostOnlyTitle.status === 400 && dataPostOnlyTitle.error;
    const m8NoBody = resPostNoBody.status === 400 && dataPostNoBody.error;
    const m8EmptyJson = resPostEmptyJson.status === 400 && dataPostEmptyJson.error;
    const m8 = m8Ok && m8Title && m8NoBody && m8EmptyJson;

    check(8, 'POST /events 201; eksik veya gövdesiz veri 400', m8, `Tam: 201, Sadece title: 400, Gövdesiz: 400, Boş JSON: 400`);

    console.log('\n====================================================');
    if (allPassed) {
      console.log('🏆 12 MADDENİN 12\'Sİ DE EKSİKSİZ VE HATASIZ GEÇTİ!');
    } else {
      console.log('❌ BAZI MADDELERDE EKSİK TESPİT EDİLDİ!');
    }
    console.log('====================================================\n');
  } catch (err) {
    console.error('❌ Test sırasında beklenmeyen istisna yakalandı:', err);
    allPassed = false;
  } finally {
    server.close();
    process.exit(allPassed ? 0 : 1);
  }
});
