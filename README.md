# NOVEX — Kurumsal + E-Ticaret

Modern, mobil öncelikli, SEO uyumlu kurumsal ürün kataloğu ve e-ticaret temeli. Özgün NOVEX tasarım sistemi; referans sitenin kurumsal bilgi mimarisini yalnızca yaklaşım seviyesinde ele alır, içerik ya da görsel kopyalamaz.

## Teknolojiler ve mimari

Next.js 15 App Router, React 19, strict TypeScript, Prisma 6 ve PostgreSQL 17 kullanılır. Production akışı `Internet → (opsiyonel Cloudflare) → Nginx → Next.js → PostgreSQL` şeklindedir. UI; yeniden kullanılabilir Header, Footer, ProductCard ve consent bileşenlerine ayrılmıştır.

## Klasör yapısı

- `app/`: sayfalar, metadata, sitemap ve robots
- `components/`: ortak UI bileşenleri
- `lib/`: domain verisi ve yardımcılar
- `prisma/`: ilişkisel veri modeli
- `nginx/`: TLS reverse proxy ve hardening
- `scripts/`: yardımcı operasyon komutları

## Kurulum ve development

```bash
cp .env.example .env
npm ci
npm run db:generate
npx prisma migrate dev --name init
npm run dev
```

Uygulama `http://localhost:3000` adresindedir. PostgreSQL çalışır olmalı ve `DATABASE_URL` doğru ayarlanmalıdır.

## Environment değişkenleri

`DATABASE_URL`, en az 32 rastgele karakterli `AUTH_SECRET`, public canonical adres için `NEXT_PUBLIC_SITE_URL`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `PAYMENT_PROVIDER` ve `PAYMENT_API_KEY`. Gerçek `.env` Git'e alınmaz. Kart numarası/CVV hiçbir ortam değişkenine ya da veritabanına yazılmaz.

## Veritabanı

Schema; User/RBAC, Product/Category/Brand, attributes, Cart, Order, Payment, Shipment, Favorite, Blog, Contact, Coupon, Review ve AuditLog ilişkilerini ve kritik indexleri içerir.

```bash
npm run db:generate
npx prisma migrate dev --name init  # geliştirme migration'ı
npm run db:migrate                 # production migration deploy
npm run db:seed                    # seed eklendiğinde demo veri
```

Admin hesabı production'da seed ile sabit parola kullanılarak oluşturulmamalıdır. İlk `SUPER_ADMIN` hesabı, tek kullanımlık CLI/bootstrap akışında Argon2id hash ve süreli davet bağlantısıyla yaratılmalı; ilk girişte parola ve MFA zorunlu değiştirilmelidir. Bu iskelet bilinçli olarak varsayılan admin parolası içermez.

## Production build ve Docker

```bash
npm ci
npm run db:generate
npm run build
npm start
```

Docker için `.env` yanında güçlü bir `POSTGRES_PASSWORD` export edin, TLS sertifikalarını `nginx/certs/fullchain.pem` ve `privkey.pem` konumlarına yerleştirin, ardından:

```bash
export POSTGRES_PASSWORD='uzun-rastgele-bir-deger'
docker compose up -d --build
docker compose exec web npx prisma migrate deploy
```

Nginx HTTP→HTTPS ve `www`→apex yönlendirmesi, TLS 1.2/1.3, HTTP/2, compression, rate limit, 8 MB body limiti, immutable static cache ve security header'ları uygular. Domain değerlerini yayından önce değiştirin. HTTP/3 için kullanılan Nginx dağıtımının QUIC desteği ayrıca doğrulanmalıdır.

## Ödeme katmanı

`PAYMENT_PROVIDER=mock` yalnızca test akışıdır. Gerçek sağlayıcı entegrasyonu sunucu tarafı provider adapter'ı, imzalı webhook, idempotency key ve tutarın sipariş snapshot'ından yeniden hesaplanmasıyla yapılmalıdır. PAN/CVV saklanmaz; sağlayıcının hosted form/tokenization çözümü kullanılmalıdır.

## Güvenlik kontrolleri

- Prisma parametreli sorguları ve Zod doğrulaması; çıktı React tarafından encode edilir.
- Auth cookie'leri production'da `Secure`, `HttpOnly`, `SameSite=Lax/Strict`; state-changing isteklerde origin + CSRF token kontrolü olmalıdır.
- RBAC her admin Server Action/API handler içinde sunucu tarafında tekrar uygulanmalıdır; yalnızca UI gizleme yetkilendirme değildir.
- Nginx rate limit, HSTS, CSP, clickjacking, MIME sniffing ve referrer koruması sağlar.
- Parolalar Argon2id ile hashlenmeli; login IP/hesap bazlı throttle ve güvenli session rotation uygulamalıdır.
- Audit log, hassas payload yerine aksiyon ve pseudonymous IP hash saklar. Token, parola, session ve ödeme verileri loglanmaz.
- Analitik/pazarlama scriptleri consent öncesinde yüklenmez; kullanıcı tercihi geri alınabilir olmalıdır.

> Bunlar savunma katmanlarıdır. Production öncesi bağımsız penetration test, KVKK hukuk incelemesi, dependency/SAST taraması ve secret rotation zorunludur.

## Backup

`DATABASE_URL` tanımlıyken `./scripts/backup.sh` timestamp'li custom-format dump üretir; `RETENTION_DAYS` varsayılan 7'dir. Geri yükleme: `pg_restore --clean --if-exists --no-owner --dbname "$DATABASE_URL" backup.dump`. Script tek başına production backup çözümü değildir: şifreli off-site/object-lock kopya, PITR/WAL arşivi, izleme ve düzenli restore tatbikatı gerekir.

## Test / release kontrol listesi

```bash
npm run build
npx prisma validate
nginx -t -c "$PWD/nginx/nginx.conf"
docker compose config
```

Release öncesinde Playwright ile kayıt/giriş/çıkış, URL filtreleri, arama, favori, sepet, checkout ve admin CRUD; yetkisiz admin, CSRF/XSS/SQLi, brute force, IDOR ve broken access-control senaryoları çalıştırılmalıdır. Lighthouse mobile/desktop ve 360, 390, 768, 1024, 1440, 1920 px görsel regresyonları CI'da koşmalıdır.
