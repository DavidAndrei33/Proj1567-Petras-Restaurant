# Research Academic - Platforme Food Delivery

## Proiect: Rotiserie & Pizza Moinești (PROJ-002)
**Data:** 2026-04-20
**Responsabil:** specialists-all
**Status:** În lucru

---

## Cuprins

1. [Analiza Competitorilor](#1-analiza-competitorilor)
2. [Studiu UX/UI pentru Food Delivery](#2-studiu-uxui-pentru-food-delivery)
3. [Research Tehnologii](#3-research-tehnologii)
4. [Analiza Sisteme de Plată](#4-analiza-sisteme-de-plată)
5. [Management Comenzi în Timp Real](#5-management-comenzi-în-timp-real)
6. [Best Practices Securitate](#6-best-practices-securitate)
7. [Recomandări Arhitectură](#7-recomandări-arhitectură)
8. [Concluzii și Recomandări](#8-concluzii-și-recomandări)

---

## 1. Analiza Competitorilor

### 1.1 Competitori Internaționali

#### **Uber Eats**
- **Puncte forte:**
  - Interfață intuitivă și modernă
  - Algoritm de recomandare avansat
  - Integrare cu Uber pentru livrare
  - Sistem de rating și review-uri robust
  - Support multi-lingv
- **Puncte slabe:**
  - Comisioane ridicate pentru restaurante (15-30%)
  - Dependență de rețeaua Uber
  - Limitări în zonele rurale
- **Tehnologii:** React Native (mobile), Node.js (backend), Python (ML)

#### **DoorDash**
- **Puncte forte:**
  - Market share dominant în SUA
  - DashPass (abonament lunar)
  - Algoritm de dynamic pricing
  - Extensie Chrome pentru comenzi
- **Puncte slabe:**
  - Controverse legate de plata livratorilor
  - Taxe ascunse percepute clienților
- **Tehnologii:** Kotlin/Swift (native mobile), Go (backend)

#### **Grubhub**
- **Puncte forte:**
  - Prezență lungă pe piață
  - Corporate ordering (comenzi de grup)
  - Integrare cu POS systems
- **Puncte slabe:**
  - Interfață învechită
  - Probleme cu timpul de livrare
- **Tehnologii:** Angular (frontend), Java (backend)

#### **Deliveroo**
- **Puncte forte:**
  - "Editions" (bucătării fantomă)
  - Algoritm de routing optimizat
  - Design premium
- **Puncte slabe:**
  - Prezență limitată geografic
  - Comisioane mari
- **Tehnologii:** React (frontend), Go (backend), Rust (routing engine)

### 1.2 Competitori Locali (România)

#### **Glovo**
- **Puncte forte:**
  - Prezență puternică în România
  - Livrare de orice (nu doar mâncare)
  - Aplicație rapidă
- **Puncte slabe:**
  - Comisioane mari pentru restaurante
  - Control limitat asupra brandului

#### **Tazz by eMAG**
- **Puncte forte:**
  - Integrare cu eMAG
  - Livrare proprie
  - Promoții frecvente
- **Puncte slabe:**
  - Interfață mai puțin polish-uită
  - Selecție limitată în orașe mici

#### **Foodpanda**
- **Puncte forte:**
  - Prezență globală
  - PandaPro (abonament)
  - Gamification (voucher-e)
- **Puncte slabe:**
  - Suport client slab
  - Probleme cu anulările

### 1.3 Platforme White-Label / Self-Hosted

#### **ChowNow**
- Model: Abonament lunar, fără comisioane per comandă
- Focus: Restaurantele mici și mijlocii
- Avantaj: Proprietate asupra datelor clienților

#### **Toast**
- Model: Hardware + Software integrat
- Focus: Restaurantele full-service
- Avantaj: Sistem POS integrat

#### **Square for Restaurants**
- Model: Plată per tranzacție
- Focus: SMB-uri
- Avantaj: Integrare cu ecosistemul Square

### 1.4 Analiza SWOT pentru Proiectul Nostru

| **Strengths** | **Weaknesses** |
|---------------|----------------|
| Proprietate completă asupra platformei | Resurse limitate vs. giganți |
| Fără comisioane intermediare | Necesită marketing propriu |
| Control total asupra experienței | Timp de dezvoltare mai lung |
| Date clienți proprii | Dependență de livrare proprie |

| **Opportunities** | **Threats** |
|-------------------|-------------|
| Piață locală neexploatată | Intrarea giganților (Glovo, Tazz) |
| Relație directă cu clienții | Schimbări regulatorii |
| Customizare pentru nișă | Costuri crescânde de marketing |
| Oportunitate de extindere | Recesiune economică |

---

## 2. Studiu UX/UI pentru Food Delivery

### 2.1 Best Practices - Landing Page Client

#### **Structură Recomandată:**
```
1. Header
   - Logo + Branding
   - Navigare (Meniu, Despre noi, Contact)
   - Coș de cumpărături (icon + counter)
   - Buton "Comandă acum"

2. Hero Section
   - Imagine/video apetisant
   - Value proposition clar
   - CTA prominent
   - Promoții active

3. Meniu Principal
   - Categorii (Pizza, Rotiserie, Băuturi, Desert)
   - Grid de produse cu imagini
   - Filtrare și sortare
   - Adăugare rapidă în coș

4. Produs Detail (Modal/Page)
   - Imagini multiple
   - Descriere detaliată
   - Opțiuni customizare (extra topping, dimensiuni)
   - Preț dinamic
   - Buton "Adaugă în coș"

5. Coș de Cumpărături
   - Lista produse
   - Modificare cantități
   - Aplicare voucher
   - Calcul total (subtotal, livrare, total)
   - Buton "Finalizează comanda"

6. Checkout
   - Formular date personale
   - Selecție adresă livrare
   - Metodă plată
   - Confirmare comandă
   - Estimare timp livrare

7. Footer
   - Informații contact
   - Program de lucru
   - Link-uri utile
   - Social media
```

### 2.2 Best Practices - Modul Magazin (Bucătărie)

#### **Dashboard Comenzi:**
```
1. Header
   - Logo
   - Notificări (comenzi noi)
   - Status sistem (online/offline)

2. Sidebar
   - Comenzi active
   - Comenzi istorice
   - Setări

3. Main Content - Grid Comenzi
   - Card per comandă
   - Timer (timp scurs de la comandă)
   - Status color-coded
   - Lista produse
   - Butoane acțiuni (Acceptă, În preparare, Gata)

4. Notificări Sonore
   - Sunet distinct pentru comandă nouă
   - Volum ajustabil
   - Notificări browser (optional)
```

### 2.3 Best Practices - Modul Admin

#### **Panou Administrativ:**
```
1. Sidebar Navigation
   - Dashboard (statistici)
   - Management Meniu
   - Management Categorii
   - Management Comenzi
   - Rapoarte
   - Setări

2. Dashboard Principal
   - KPI-uri (comenzi zi, venituri, clienți noi)
   - Grafice (trenduri săptămânale)
   - Comenzi recente
   - Alerte (stocuri scăzute)

3. Management Meniu
   - Tabel produse (imagine, nume, preț, categorie, status)
   - Adăugare/Editare produs
   - Upload imagini
   - Setare opțiuni (extra topping, dimensiuni)
```

### 2.4 Principii UX Cheie

1. **Viteză** - Timp de încărcare < 3 secunde
2. **Simplitate** - Flow de comandă în maxim 4 pași
3. **Vizual** - Imagini de calitate pentru toate produsele
4. **Feedback** - Confirmări clare pentru acțiuni
5. **Accesibilitate** - Contrast bun, font-uri lizibile, touch-friendly
6. **Mobile-first** - 70%+ comenzi de pe mobil

### 2.5 Pattern-uri UI Recomandate

- **Skeleton screens** pentru loading states
- **Infinite scroll** pentru lista de produse
- **Sticky header** cu coș și total
- **Stepper** pentru checkout (1. Coș → 2. Date → 3. Plată → 4. Confirmare)
- **Real-time updates** pentru status comenzi (WebSocket/SSE)

---

## 3. Research Tehnologii

### 3.1 Frontend

#### **Opțiuni Principale:**

| Tehnologie | Pros | Cons | Recomandare |
|------------|------|------|-------------|
| **Next.js 14** | SSR/SSG, App Router, performanță, SEO | Learning curve | ⭐⭐⭐⭐⭐ |
| **React 18** | Ecosistem vast, flexibilitate | Necesită configurare | ⭐⭐⭐⭐ |
| **Vue 3** | Ușor de învățat, performant | Ecosistem mai mic | ⭐⭐⭐ |
| **SvelteKit** | Performanță maximă, puțin cod | Comunitate mai mică | ⭐⭐⭐ |

#### **Recomandare: Next.js 14 (App Router)**

**Motivație:**
- Server Components pentru performanță
- Server Actions pentru form-uri
- Parallel routes pentru dashboard
- Intercepting routes pentru modale
- Built-in caching și revalidation

#### **Stack Frontend Recomandat:**
```
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (styling)
- shadcn/ui (componente UI)
- TanStack Query (server state)
- Zustand (client state)
- React Hook Form (form-uri)
- Zod (validare)
```

### 3.2 Backend

#### **Opțiuni Principale:**

| Tehnologie | Pros | Cons | Recomandare |
|------------|------|------|-------------|
| **Node.js + Express/Fastify** | JavaScript full-stack, rapid | Single-threaded | ⭐⭐⭐⭐ |
| **Node.js + NestJS** | Arhitectură enterprise, DI | Verbos | ⭐⭐⭐⭐⭐ |
| **Go** | Performanță, concurrency | Learning curve | ⭐⭐⭐⭐ |
| **Python + FastAPI** | Rapid dezvoltare, ML-ready | Performanță mai slabă | ⭐⭐⭐ |

#### **Recomandare: Node.js + NestJS**

**Motivație:**
- Arhitectură modulară (potrivită pentru modulele proiectului)
- Dependency Injection
- TypeScript nativ
- Documentație API automată (Swagger)
- Microservices-ready

#### **Stack Backend Recomandat:**
```
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL (bază de date)
- Redis (caching, sessions, real-time)
- Socket.io (real-time updates)
- JWT (autentificare)
- Passport.js (strategii auth)
```

### 3.3 Bază de Date

#### **Opțiuni:**

| Tehnologie | Pros | Cons | Recomandare |
|------------|------|------|-------------|
| **PostgreSQL** | Relațional, robust, ACID | Scaling orizontal complex | ⭐⭐⭐⭐⭐ |
| **MySQL** | Popular, ușor de găsit hosting | Performanță inferioară | ⭐⭐⭐⭐ |
| **MongoDB** | Flexibil, scaling ușor | Consistență eventuală | ⭐⭐⭐ |

#### **Recomandare: PostgreSQL**

**Motivație:**
- ACID compliance (esențial pentru comenzi și plăți)
- JSON support (flexibilitate pentru opțiuni produse)
- Full-text search (căutare în meniu)
- PostGIS (dacă extindem cu livrare pe hartă)

### 3.4 Real-Time (Comenzi în Timp Real)

#### **Opțiuni:**

| Tehnologie | Pros | Cons | Recomandare |
|------------|------|------|-------------|
| **Socket.io** | Ușor de folosit, fallback-uri | Necesită server dedicat | ⭐⭐⭐⭐⭐ |
| **Server-Sent Events** | Unidirectional, simplu | Doar server → client | ⭐⭐⭐⭐ |
| **WebRTC** | P2P, low latency | Complex | ⭐⭐ |
| **Redis Pub/Sub** | Rapid, scalabil | Mesaje volatile | ⭐⭐⭐⭐ |

#### **Recomandare: Socket.io + Redis Adapter**

**Motivație:**
- Bidirecțional (comenzi noi + status updates)
- Rooms (separare pe restaurant/bucătărie)
- Redis adapter pentru scaling multi-server

### 3.5 Hosting & Deployment

#### **Opțiuni:**

| Platformă | Pros | Cons | Recomandare |
|-----------|------|------|-------------|
| **Vercel** | Optimizat Next.js, CDN global | Limitări serverless | ⭐⭐⭐⭐⭐ |
| **Railway/Render** | Simplu, PostgreSQL inclus | Costuri la scale | ⭐⭐⭐⭐ |
| **AWS/GCP/Azure** | Control total, scalabil | Complexitate | ⭐⭐⭐⭐ |
| **DigitalOcean** | Preț bun, simplu | Menținere manuală | ⭐⭐⭐ |

#### **Recomandare: Vercel (frontend) + Railway (backend)**

**Motivație:**
- Vercel optimizat pentru Next.js
- Railway simplu pentru NestJS + PostgreSQL
- Costuri predictibile la început
- Posibilitate de migrare la AWS ulterior

---

## 4. Analiza Sisteme de Plată

### 4.1 Opțiuni pentru România

#### **Netopia (mobilPay)**
- **Avantaje:**
  - Lider în România
  - Suport RO/EN
  - Integrare ușoară
  - Comisioane competitive (1.5-2.5%)
- **Dezavantaje:**
  - Contract necesar
  - Documentație învechită

#### **Stripe**
- **Avantaje:**
  - Documentație excelentă
  - SDK-uri moderne
  - Support internațional
  - Stripe Elements (UI customizabil)
- **Dezavantaje:**
  - Comisioane mai mari (1.5% + 0.5 EUR)
  - Necesită SRL/SA

#### **PayU**
- **Avantaje:**
  - Prezență în România
  - Multiple metode de plată
- **Dezavantaje:**
  - Interfață învechită
  - Comisioane variabile

#### **Braintree (PayPal)**
- **Avantaje:**
  - PayPal integration
  - Vault (stocare carduri sigură)
- **Dezavantaje:**
  - Disponibilitate limitată în RO

### 4.2 Metode de Plată Recomandate

1. **Card online** (Visa/Mastercard) - Principal
2. **Cash la livrare** - Opțiune esențială în România
3. **Apple Pay / Google Pay** - Nice to have
4. **Transfer bancar** - Pentru comenzi corporate

### 4.3 Recomandare

**Faza 1:** Cash + Card (Netopia sau Stripe)
**Faza 2:** Adăugare Apple Pay / Google Pay
**Faza 3:** Abonamente / Wallet intern

### 4.4 Considerații Securitate

- **PCI DSS Compliance** - Nu stocăm date card direct
- **3D Secure** - Autentificare suplimentară
- **Tokenizare** - Folosim token-uri, nu carduri
- **SSL/TLS** - Toate tranzacțiile pe HTTPS

---

## 5. Management Comenzi în Timp Real

### 5.1 Flow-ul unei Comenzi

```
[Client] Plasează comanda
    ↓
[Sistem] Validează stoc + date
    ↓
[Sistem] Procesează plată (dacă e online)
    ↓
[Sistem] Creează comandă în DB (status: PRIMITĂ)
    ↓
[WebSocket] Notificare bucătărie (sunet + vizual)
    ↓
[Bucătărie] Acceptă comanda (status: ACCEPTATĂ)
    ↓
[Bucătărie] Începe prepararea (status: ÎN PREPARARE)
    ↓
[Bucătărie] Finalizează prepararea (status: GATA)
    ↓
[Livrare] Preia comanda (status: LA LIVRARE)
    ↓
[Client] Primește comanda (status: LIVRATĂ)
```

### 5.2 Arhitectură Real-Time

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Next.js   │────▶│   NestJS    │
│  (Browser)  │◀────│   (Frontend)│◀────│   (Backend) │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                       │  Socket.io  │
                                        │   Server    │
                                        └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │    Redis    │
                                        │   Adapter   │
                                        └─────────────┘
```

### 5.3 Model Date - Comandă

```typescript
interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
  items: OrderItem[];
  status: OrderStatus;
  payment: {
    method: 'cash' | 'card';
    status: 'pending' | 'paid' | 'failed';
    amount: number;
  };
  timeline: OrderTimelineEvent[];
  createdAt: Date;
  estimatedReadyAt: Date;
  notes?: string;
}

enum OrderStatus {
  RECEIVED = 'received',       // Primită
  ACCEPTED = 'accepted',       // Acceptată
  PREPARING = 'preparing',     // În preparare
  READY = 'ready',             // Gata
  OUT_FOR_DELIVERY = 'out_for_delivery', // La livrare
  DELIVERED = 'delivered',     // Livrată
  CANCELLED = 'cancelled',     // Anulată
}

interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: Date;
  actor: 'system' | 'kitchen' | 'delivery' | 'customer';
}
```

### 5.4 Notificări

| Eveniment | Destinatar | Canal | Prioritate |
|-----------|------------|-------|------------|
| Comandă nouă | Bucătărie | WebSocket + Sunet | High |
| Status schimbat | Client | WebSocket + SMS | Medium |
| Comandă gata | Livrator | WebSocket + Push | High |
| Comandă livrată | Client | SMS | Low |
| Comandă anulată | Toți | WebSocket + SMS | High |

---

## 6. Best Practices Securitate

### 6.1 Autentificare și Autorizare

- **JWT** cu expiry scurt (15 min)
- **Refresh tokens** pentru sesiuni lungi
- **Role-based access control (RBAC)**
  - `customer` - doar comenzi proprii
  - `kitchen` - doar modul bucătărie
  - `admin` - full access
  - `delivery` - doar comenzi atribuite
- **2FA** pentru conturile admin

### 6.2 Protecție Date

- **GDPR Compliance**
  - Consent explicit pentru marketing
  - Drept la ștergere (right to be forgotten)
  - Export date la cerere
- **Criptare**
  - Date sensibile în DB (AES-256)
  - Comunicare HTTPS (TLS 1.3)
  - Passwords (bcrypt/Argon2)

### 6.3 Protecție Aplicație

- **Rate limiting** - Prevenire brute force
- **Input validation** - Zod/Joi pentru toate input-urile
- **SQL injection** - Prisma ORM (parameterized queries)
- **XSS protection** - React built-in escaping
- **CSRF tokens** - Pentru form-uri
- **CORS** - Configurat strict

### 6.4 Securitate Plăți

- **PCI DSS** - Nu stocăm carduri, folosim token-uri
- **3D Secure 2.0** - Autentificare suplimentară
- **Fraud detection** - Verificare IP, device fingerprinting
- **Webhook signature verification** - Pentru callback-uri plată

### 6.5 Securitate Infrastructură

- **Environment variables** - Niciodată hardcoded
- **Secrets management** - HashiCorp Vault sau AWS Secrets Manager
- **Container security** - Imagini minimaliste, scanning
- **WAF** - Web Application Firewall (Cloudflare/AWS WAF)
- **DDoS protection** - Cloudflare sau similar
- **Backups** - Automat, criptat, testat

---

## 7. Recomandări Arhitectură

### 7.1 Arhitectură Generală

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Landing Page   │  Modul Magazin  │      Modul Admin        │
│  (Next.js)      │  (Next.js)      │      (Next.js)          │
│                 │                 │                         │
│  - Meniu public │  - Dashboard    │  - Management meniu     │
│  - Coș          │  - Comenzi real-│  - Rapoarte             │
│  - Checkout     │    time         │  - Setări               │
│  - Urmărire     │  - Notificări   │                         │
│                 │                 │                         │
└─────────────────┴─────────────────┴─────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│                    (NestJS / Express)                        │
│                                                              │
│  - Auth (JWT)           - Rate Limiting                      │
│  - Validation           - Logging                            │
│  - Error Handling       - CORS                               │
└─────────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Orders    │   │   Menu      │   │   Users     │
│   Service   │   │   Service   │   │   Service   │
│             │   │             │   │             │
│  - CRUD     │   │  - CRUD     │   │  - Auth     │
│  - Status   │   │  - Categorii│   │  - Profile  │
│  - Timeline │   │  - Opțiuni  │   │  - Roluri   │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                 │
       └────────────┬────┴─────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
├─────────────────┬─────────────────┬─────────────────────────┤
│   PostgreSQL    │     Redis       │    File Storage         │
│                 │                 │                         │
│  - Date relaționale│  - Caching   │  - Imagini produse      │
│  - ACID         │  - Sessions     │  - Exporturi            │
│  - Full-text    │  - Real-time    │                         │
│    search       │    pub/sub      │                         │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### 7.2 Arhitectură Monolit vs Microservicii

**Recomandare: Monolit modular (pentru început)**

| Aspect | Monolit Modular | Microservicii |
|--------|----------------|---------------|
| **Complexitate** | Medie | Ridicată |
| **Timp dezvoltare** | Rapid | Lung |
| **Debugging** | Ușor | Complex |
| **Scaling** | Vertical + orizontal (mai târziu) | Orizontal nativ |
| **Echipă** | 2-3 devs | 5+ devs |
| **Cost** | Mic | Mediu-Mare |

**Motivație:**
- Echipă mică la început
- Timp rapid de lansare (MVP)
- Module clar separate în cod (pregătire pentru extragere)
- Migrare la microservicii posibilă ulterior

### 7.3 Structură Proiect

```
rotiserie-pizza-moinesti/
├── apps/
│   ├── web/                    # Landing page (Next.js)
│   ├── kitchen/                # Modul bucătărie (Next.js)
│   └── admin/                  # Modul admin (Next.js)
├── packages/
│   ├── ui/                     # Componente shared (shadcn)
│   ├── types/                  # TypeScript types
│   ├── config/                 # Configurări (ESLint, TS)
│   └── utils/                  # Utilități shared
├── api/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── orders/         # Modul comenzi
│   │   │   ├── menu/           # Modul meniu
│   │   │   ├── users/          # Modul utilizatori
│   │   │   ├── payments/       # Modul plăți
│   │   │   └── notifications/  # Modul notificări
│   │   ├── common/             # Guards, interceptors, pipes
│   │   └── main.ts             # Entry point
│   └── prisma/
│       └── schema.prisma       # Schema DB
├── docker-compose.yml          # Dev environment
└── turbo.json                  # Turborepo config
```

---

## 8. Concluzii și Recomandări

### 8.1 Stack Tehnologic Recomandat

| Componentă | Tehnologie | Motivație |
|------------|-----------|-----------|
| **Frontend** | Next.js 14 + TypeScript | SSR, performanță, SEO |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid, consistent, accesibil |
| **Backend** | NestJS + TypeScript | Arhitectură modulară, scalabil |
| **Database** | PostgreSQL + Prisma | ACID, relational, type-safe |
| **Cache** | Redis | Caching, sessions, real-time |
| **Real-time** | Socket.io + Redis Adapter | Bidirecțional, scalabil |
| **Auth** | JWT + Passport.js | Standard, flexibil |
| **Plăți** | Netopia / Stripe | Local + internațional |
| **Hosting** | Vercel + Railway | Rapid, costuri predictibile |
| **Monorepo** | Turborepo | Code sharing, build optimization |

### 8.2 Faze de Implementare

#### **Faza 1: MVP (4-6 săptămâni)**
- Landing page cu meniu și coș
- Checkout cu cash și card
- Modul bucătărie basic (dashboard comenzi)
- Admin basic (management meniu)

#### **Faza 2: Enhancement (2-4 săptămâni)**
- Notificări real-time
- Urmărire status comandă
- Rapoarte basic
- Optimizări UX

#### **Faza 3: Scale (continuu)**
- Aplicație mobilă (React Native / PWA)
- Sistem de loialitate
- Marketing automation
- Integrări extra (accounting, delivery)

### 8.3 Metrici de Succes

- **Timp de încărcare pagină** < 3 secunde
- **Flow comandă** < 2 minute
- **Uptime** > 99.5%
- **Conversie** > 15% (vizitatori → comenzi)
- **Satisfacție client** > 4.5/5

### 8.4 Riscuri și Mitigări

| Risc | Probabilitate | Impact | Mitigare |
|------|--------------|--------|----------|
| Întârzieri tehnice | Medie | Mediu | Buffer în timeline, MVP focus |
| Costuri neașteptate | Medie | Mediu | Buget flexibil, monitoring |
| Concurență Glovo/Tazz | Ridicată | Ridicat | Diferențiere locală, prețuri |
| Probleme securitate | Scăzută | Ridicat | Audit regulat, best practices |
| Adopție lentă | Medie | Ridicat | Marketing local, promoții |

---

## Referințe

1. Uber Eats Engineering Blog - https://eng.uber.com/
2. DoorDash Engineering - https://doordash.engineering/
3. Deliveroo Engineering - https://deliveroo.engineering/
4. Stripe Documentation - https://stripe.com/docs
5. NestJS Documentation - https://docs.nestjs.com
6. Next.js Documentation - https://nextjs.org/docs
7. Prisma Documentation - https://www.prisma.io/docs
8. OWASP Top 10 - https://owasp.org/www-project-top-ten/
9. PCI DSS Standards - https://www.pcisecuritystandards.org/
10. GDPR Guidelines - https://gdpr.eu/

---

**Document pregătit de:** specialists-all
**Data finalizării:** 2026-04-20
**Status:** Complet
**Următorul pas:** Review cu product-architect și backend-architect
