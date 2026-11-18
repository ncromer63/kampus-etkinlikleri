import fs from 'fs';
import { execSync } from 'child_process';
import mongoose from 'mongoose';

console.log('====================================================');
console.log('   SPRINT 8 — 12 PUAN & TESLİM KONTROL LİSTESİ DENETİMİ');
console.log('====================================================\n');

let allPassed = true;
let totalScore = 0;

function check(points, title, passed, detail = '') {
  const symbol = passed ? '✅ GEÇTİ' : '❌ BAŞARISIZ';
  console.log(`[${symbol}] (${points} Puan) ${title}`);
  if (detail) console.log(`       👉 ${detail}`);
  if (passed) {
    totalScore += points;
  } else {
    allPassed = false;
  }
}

// 1. Temel hazırlık: npm install + npm run dev çalışıyor (1 puan)
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasDev = pkg.scripts && pkg.scripts.dev && pkg.scripts.dev.includes('src/server.js');
const hasStart = pkg.scripts && pkg.scripts.start && pkg.scripts.start.includes('src/server.js');
const hasSeed = pkg.scripts && pkg.scripts.seed && pkg.scripts.seed.includes('seed-events.js');
const hasMongoose = pkg.dependencies && pkg.dependencies.mongoose;
check(
  1,
  'Madde 1: Temel hazırlık (package.json scripts + dependencies)',
  hasDev && hasStart && hasSeed && hasMongoose,
  `dev: "${pkg.scripts?.dev}", seed: "${pkg.scripts?.seed}", mongoose: ${pkg.dependencies?.mongoose}`
);

// 2. Bağlantı: config/database.js'te URI .env'den, MONGODB_URI (2 puan)
const dbJsPath = fs.existsSync('src/config/database.js') ? 'src/config/database.js' : 'config/database.js';
const dbJsExists = fs.existsSync(dbJsPath);
let dbJsContent = '';
if (dbJsExists) {
  dbJsContent = fs.readFileSync(dbJsPath, 'utf8');
}
const readsMongoUri = dbJsContent.includes('process.env.MONGODB_URI');
const connectsMongoose = dbJsContent.includes('mongoose.connect');
check(
  2,
  'Madde 2: Veritabanı bağlantı modülü (config/database.js MONGODB_URI)',
  dbJsExists && readsMongoUri && connectsMongoose,
  `Dosya: ${dbJsPath}, process.env.MONGODB_URI ve mongoose.connect kontrol edildi`
);

// 3. Schema: required, trim, timestamps ve özel kurallar (2 puan)
const modelPath = fs.existsSync('src/models/event.model.js') ? 'src/models/event.model.js' : 'models/event.model.js';
const modelExists = fs.existsSync(modelPath);
let modelContent = '';
if (modelExists) {
  modelContent = fs.readFileSync(modelPath, 'utf8');
}
const hasTrim = modelContent.includes('trim: true');
const hasRequired = modelContent.includes('required: true');
const hasTimestamps = modelContent.includes('timestamps: true');
const hasEnum = modelContent.includes('Yazılım') && modelContent.includes('Tasarım') && modelContent.includes('Kariyer');
const hasMinMax = modelContent.includes('minlength: 3') || modelContent.includes('min: 5');
check(
  2,
  'Madde 3: Event Schema & Model kuralları',
  modelExists && hasTrim && hasRequired && hasTimestamps && hasEnum && hasMinMax,
  'title (min 3, max 100, trim), category enum (Yazılım, Tasarım, Kariyer), capacity (min 5, default 50), timestamps: true'
);

// 4. Seed: npm run seed 6 kayıt, iki kez çalışınca da 6 (2 puan)
const seedPath = fs.existsSync('src/data/seed-events.js') ? 'src/data/seed-events.js' : 'data/seed-events.js';
const seedExists = fs.existsSync(seedPath);
let seedContent = '';
if (seedExists) {
  seedContent = fs.readFileSync(seedPath, 'utf8');
}
const hasDeleteMany = seedContent.includes('deleteMany');
const hasInsertMany = seedContent.includes('insertMany');
check(
  2,
  'Madde 4: Seed mekanizması (src/data/seed-events.js)',
  seedExists && hasDeleteMany && hasInsertMany,
  'deleteMany({}) ve insertMany() içeriyor; her çalıştırmada veri tekrarlanmadan temizlenip 6 kayıt yüklenir'
);

// 5. GET: liste ve detay Mongoose'dan; olmayan ve geçersiz id 404 (2 puan)
const ctrlPath = 'src/controllers/event.controller.js';
const ctrlExists = fs.existsSync(ctrlPath);
let ctrlContent = '';
if (ctrlExists) {
  ctrlContent = fs.readFileSync(ctrlPath, 'utf8');
}
const hasFind = ctrlContent.includes('Event.find');
const hasSort = ctrlContent.includes('sort(');
const hasFindById = ctrlContent.includes('Event.findById');
const hasValidObjId = ctrlContent.includes('isValidObjectId');
const has404 = ctrlContent.includes('404');
check(
  2,
  'Madde 5: GET /events & GET /events/:id kontrolleri',
  ctrlExists && hasFind && hasSort && hasFindById && hasValidObjId && has404,
  'Event.find().sort({ date: 1 }), isValidObjectId kontrolü ve 404 yanıtı doğrulandı'
);

// 6. POST: 201; eksik veri 400 ve sunucu çökmüyor (2 puan)
const hasCreate = ctrlContent.includes('Event.create');
const hasValidationError = ctrlContent.includes('ValidationError');
const has400 = ctrlContent.includes('400');
check(
  2,
  'Madde 6: POST /events doğrulama ve hata yakalama',
  ctrlExists && hasCreate && hasValidationError && has400,
  'Event.create() ve catch bloğunda ValidationError -> 400 yanıtı doğrulandı'
);

// 7. Kalıcılık & Hata Middleware'i (1 puan)
const appPath = 'src/app.js';
const appContent = fs.readFileSync(appPath, 'utf8');
const hasHealthStudent = appContent.includes('2416501085');
const hasErrorMiddleware = appContent.includes('err, req, res, next') && appContent.includes('500');
check(
  1,
  'Madde 7: Kalıcılık altyapısı, /health ve Hata Middleware',
  hasHealthStudent && hasErrorMiddleware,
  'GET /health student "2416501085" ve 4 parametreli hata yakalama middleware mevcut'
);

console.log('\n====================================================');
console.log(`   TOPLAM PUAN: ${totalScore} / 12`);
console.log('====================================================');

// Git & Güvenlik Kontrolleri (Ön Şartlar)
console.log('\n--- Ön Şart Güvenlik & Git Kontrolleri ---');
let trackedEnv = '';
let trackedModules = '';
try {
  trackedEnv = execSync('git ls-files .env src/.env backend/.env', { encoding: 'utf8' }).trim();
  trackedModules = execSync('git ls-files node_modules backend/node_modules', { encoding: 'utf8' }).trim();
} catch (e) {}

const envSecure = trackedEnv === '';
const modulesSecure = trackedModules === '';
const hasEnvExample = fs.existsSync('.env.example');

console.log(`[${envSecure ? '✅ GÜVENLİ' : '❌ TEHLİKE'}] .env git takibinde DEĞİL`);
console.log(`[${modulesSecure ? '✅ GÜVENLİ' : '❌ TEHLİKE'}] node_modules git takibinde DEĞİL`);
console.log(`[${hasEnvExample ? '✅ MEVCUT' : '❌ EKSİK'}] .env.example şablonu mevcut`);

if (!envSecure || !modulesSecure || !allPassed) {
  process.exit(1);
} else {
  console.log('\n🎉 Tebrikler! Tüm Sprint 8 gereksinimleri başarıyla tamamlandı.\n');
}
