# Research Academic: Integrare Completă Backend-v2 cu Frontend

## Executive Summary

Acest document prezintă o analiză exhaustivă a integrării backend-v2 (Fastify + Prisma + PostgreSQL) cu cele trei module frontend (Customer Landing, Store KDS, Admin Panel). Backend-v2 oferă un API REST complet cu autentificare JWT, gestionare comenzi cu 7 statusuri, produse, categorii, setări, program de lucru, plăți Stripe și notificări real-time SSE. Analiza mapează fiecare buton, acțiune și flux de date din frontend la endpoint-urile corespunzătoare din backend, identificând exact ce mock data trebuie înlocuit și cum.

---

## 1. Arhitectură Backend-v2

### 1.1 Stack Tehnologic

| Componentă | Tehnologie | Rol |
|-----------|-----------|-----|
| **Server** | Fastify 5.x | HTTP server, routing, middleware |
| **ORM** | Prisma 6.x | Database abstraction, migrations |
| **Database** | PostgreSQL 16 | Persistence layer |
| **Cache** | Redis 7 | Rate limiting, sessions, pub/sub |
| **Auth** | JWT (access + refresh) | Stateless authentication |
| **Password** | Argon2id | Hashing securizat |
| **Validare** | Zod | Schema validation |
| **Docs** | Swagger/OpenAPI | API documentation |
| **Metrics** | Prometheus | Monitoring |
| **Plăți** | Stripe | Card payments |
| **Real-time** | SSE | Server-Sent Events pentru comenzi |

### 1.2 Baza de Date — Schema Prisma

```prisma
User          (id, email, password, name, role, phone, address, isActive)
Category      (id, name, slug, description, image, sortOrder, isActive)
Product       (id, name, description, price, image, categoryId, isFeatured, isAvailable)
Order         (id, userId, customerName, customerPhone, customerAddress, total, status, paymentMethod, paymentStatus, notes)
OrderItem     (id, orderId, productId, name, price, quantity)
OrderStatusHistory (id, orderId, status, notes)
Setting       (id, key, value)
BusinessHour  (id, dayOfWeek, openTime, closeTime, isClosed)
```

**Enum-uri:**
- `Role`: CUSTOMER, KITCHEN, ADMIN, SUPERADMIN
- `OrderStatus`: RECEIVED, ACCEPTED, PREPARING, READY, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
- `PaymentStatus`: PENDING, PAID, FAILED, REFUNDED

### 1.3 Flow-ul Statusurilor Comenzii

```
RECEIVED → ACCEPTED → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED
    ↓
CANCELLED (doar din RECEIVED sau ACCEPTED)
```

**Reguli de tranziție:**
- Nu se poate merge înapoi în flow
- CANCELLED e permis doar din RECEIVED sau ACCEPTED
- Fiecare tranziție creează un record în OrderStatusHistory
- Toate schimbările emit eveniment SSE

---

## 2. API Endpoints — Mapare Completă

### 2.1 Autentificare (`/api/auth`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| POST | `/register` | Public | Creare cont | Customer: RegisterPage |
| POST | `/login` | Public | Login email/parolă | All: LoginPage |
| POST | `/refresh` | Public | Refresh access token | All: auto-refresh |
| GET | `/me` | Bearer | User curent | All: Header, Account |
| GET | `/users` | Admin | Lista toți userii | Admin: UsersPage |

**Auth Flow:**
1. Login → primește `accessToken` (15 min) + `refreshToken` (7 zile)
2. Fiecare request trimite `Authorization: Bearer <token>`
3. Token expirat → `/refresh` cu refreshToken → nou accessToken
4. Logout → șterge token-uri din localStorage

### 2.2 Produse (`/api/products`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| GET | `/` | Public | Lista produse (active) | Landing: MenuPage |
| GET | `/?all=true` | Admin | Toate produsele | Admin: Products |
| GET | `/:id` | Public | Produs by ID | Landing: Product detail |
| POST | `/` | Admin | Creare produs | Admin: Products |
| PUT | `/:id` | Admin | Update produs | Admin: Products |
| DELETE | `/:id` | Admin | Ștergere produs | Admin: Products |

**Query params:**
- `category` — filtrează după slug categorie
- `featured=true` — doar produse featured
- `search` — căutare text în nume/descriere
- `page`, `limit` — paginare

### 2.3 Categorii (`/api/categories`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| GET | `/` | Public | Lista categorii active | Landing: CategoryFilter |
| GET | `/:id` | Public | Categorie by ID | — |
| POST | `/` | Admin | Creare categorie | Admin: Products |
| PUT | `/:id` | Admin | Update categorie | Admin: Products |
| DELETE | `/:id` | Admin | Ștergere categorie | Admin: Products |

### 2.4 Comenzi (`/api/orders`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| POST | `/` | Public | Creare comandă | Landing: Checkout |
| GET | `/` | Kitchen | Lista comenzi | Store: Kanban, Admin: Orders |
| GET | `/:id` | Kitchen | Comandă by ID | Admin: Order detail |
| GET | `/:id/track` | Public | Track cu phone | Landing: OrderTracking |
| PATCH | `/:id/status` | Kitchen | Update status | Store: Status buttons |

**Query params pentru GET /:**
- `status` — filtrează după status
- `phone` — căutare după telefon
- `dateFrom`, `dateTo` — filtru dată
- `page`, `limit` — paginare

**Body pentru POST /:**
```json
{
  "customerName": "Ion Popescu",
  "customerPhone": "0722123456",
  "customerAddress": "Str. Principală 10",
  "items": [{"productId": 1, "quantity": 2}],
  "paymentMethod": "cash|card|online",
  "notes": "Extra picant"
}
```

**Body pentru PATCH /:id/status:**
```json
{
  "status": "ACCEPTED",
  "notes": "Comanda acceptata"
}
```

### 2.5 Setări (`/api/settings`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| GET | `/` | Public | Toate setările | All: various |
| PUT | `/:key` | Admin | Update setting | Admin: Settings |
| GET | `/business-hours` | Public | Program lucru | Landing: footer info |
| GET | `/business-hours/check` | Public | Verifică dacă e deschis | Landing: order gate |
| PUT | `/business-hours/:day` | Admin | Update zi | Admin: Settings |

### 2.6 Plăți (`/api/payments`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| POST | `/intent` | Bearer | Creează Stripe PaymentIntent | Landing: Checkout (card) |
| GET | `/intent/:id` | Bearer | Status PaymentIntent | Landing: Checkout |
| POST | `/webhook` | Public | Stripe webhook | Backend only |

### 2.7 Real-time (`/api/events`)

| Method | Endpoint | Auth | Descriere | Frontend Usage |
|--------|----------|------|-----------|----------------|
| GET | `/orders/:id` | Public | SSE pentru comandă | Landing: OrderTracking |
| GET | `/kitchen` | API Key | SSE toate comenzile | Store: Real-time updates |

**Evenimente SSE:**
- `ORDER_CREATED` — comandă nouă
- `ORDER_STATUS_CHANGED` — status modificat
- `heartbeat` — keep-alive la 30s

---

## 3. Frontend Module — Ce Trebuie Integrat

### 3.1 LANDING (Customer) — `/apps/landing/`

| Pagină | Ce folosește acum | Ce trebuie API |
|--------|-------------------|----------------|
| **HomePage** | Mock products | `GET /api/products` |
| **MenuPage** | Mock products | `GET /api/products`, `GET /api/categories` |
| **CartPage** | Local state (CartContext) | — (local only) |
| **CheckoutPage** | Form + mock submit | `POST /api/orders` |
| **OrderSuccessPage** | Static | `GET /api/orders/:id/track` |
| **LoginPage** | Mock login | `POST /api/auth/login` |
| **RegisterPage** | Mock register | `POST /api/auth/register` |
| **AccountPage** | Mock user + mock orders | `GET /api/auth/me`, `GET /api/orders?phone=` |
| **OrderTrackingPage** | Mock order + timeline | `GET /api/orders/:id/track?phone=`, SSE `/api/events/orders/:id` |

**Mock data de șters:**
- `src/data/products.js` — înlocuit cu API call
- `src/context/AuthContext.jsx` — login/register mock → API
- `src/pages/AccountPage.jsx` — mock orders → API
- `src/pages/OrderTrackingPage.jsx` — mock order data → API

### 3.2 STORE (KDS) — `/apps/store-v2/`

| Component | Ce folosește acum | Ce trebuie API |
|-----------|-------------------|----------------|
| **App.tsx** | Mock orders | `GET /api/orders` (polling la 5s) |
| **OrderCard** | Local state update | `PATCH /api/orders/:id/status` |
| **Header** | Mock stats | Calculat din `GET /api/orders` |
| **useOrders hook** | Mock fetch | `GET /api/orders` + SSE `/api/events/kitchen` |
| **mockOrders.ts** | Date statice | Șters complet |

**Mock data de șters:**
- `src/data/mockOrders.ts` — șters, înlocuit cu API
- `src/hooks/useOrders.ts` — refetchInterval → polling real

### 3.3 ADMIN — `/apps/admin/`

| Pagină | Ce folosește acum | Ce trebuie API |
|--------|-------------------|----------------|
| **Dashboard** | Mock stats + chart | `GET /api/orders`, agregare locală |
| **Products** | Mock products | `GET /api/products?all=true`, `POST/PUT/DELETE` |
| **Orders** | Mock orders | `GET /api/orders` |
| **UsersPage** | Mock users | `GET /api/auth/users`, `POST` (creare user) |
| **Settings** | Local state only | `GET /api/settings`, `PUT`, `GET/PUT /api/settings/business-hours` |
| **Reports** | Mock data | `GET /api/orders` cu filtre date |

**Mock data de șters:**
- `src/data/mockData.js` — toate datele mock
- AuthContext — login mock → API real
- Stats, orders, products — toate din API

---

## 4. Mapare Detaliată: Buton → API

### 4.1 Landing (Customer)

| Buton/Acțiune | API Endpoint | Method | Body/Query |
|---------------|--------------|--------|------------|
| "Adaugă în coș" | — | Local | CartContext (fără API) |
| "Continuă la plată" | — | Navigare | `/checkout` |
| "Plasează comanda" | `/api/orders` | POST | customerName, phone, address, items, paymentMethod |
| "Intră în cont" | `/api/auth/login` | POST | email, password |
| "Creează cont" | `/api/auth/register` | POST | name, email, password, phone |
| "Contul meu" | `/api/auth/me` | GET | Bearer token |
| "Comenzile mele" | `/api/orders?phone=` | GET | phone din user |
| "Track comandă" | `/api/orders/:id/track` | GET | phone în query |
| "Plătește cu card" | `/api/payments/intent` | POST | amount, currency |

### 4.2 Store (KDS)

| Buton/Acțiune | API Endpoint | Method | Body |
|---------------|--------------|--------|------|
| Card comandă nouă | — | SSE | Listen ORDER_CREATED |
| "Acceptată" (din Nouă) | `/api/orders/:id/status` | PATCH | `{"status": "ACCEPTED"}` |
| "În preparare" (din Acceptată) | `/api/orders/:id/status` | PATCH | `{"status": "PREPARING"}` |
| "Gata" (din În preparare) | `/api/orders/:id/status` | PATCH | `{"status": "READY"}` |
| "În livrare" (din Gata) | `/api/orders/:id/status` | PATCH | `{"status": "OUT_FOR_DELIVERY"}` |
| "Livrată" (din În livrare) | `/api/orders/:id/status` | PATCH | `{"status": "DELIVERED"}` |
| "Înapoi" (oricare status) | — | — | **NU EXISTĂ** — backend nu permite înapoi |
| Refresh manual | `/api/orders` | GET | — |
| Auto-refresh | `/api/orders` | GET | Polling 5s + SSE fallback |

### 4.3 Admin

| Buton/Acțiune | API Endpoint | Method | Body |
|---------------|--------------|--------|------|
| "Adaugă Produs" | `/api/products` | POST | name, price, categoryId, etc. |
| "Editează Produs" | `/api/products/:id` | PUT | name, price, etc. |
| "Activează/Dezactivează" | `/api/products/:id` | PUT | `{"isAvailable": true/false}` |
| "Adaugă Utilizator" | `/api/auth/register` | POST | name, email, password, role |
| "Editează Utilizator" | — | — | **NU EXISTĂ** — trebuie adăugat în backend |
| "Activează/Dezactivează User" | — | — | **NU EXISTĂ** — trebuie adăugat în backend |
| "Salvează Setări" | `/api/settings/:key` | PUT | `{"value": "..."}` |
| "Salvează Program" | `/api/settings/business-hours/:day` | PUT | openTime, closeTime, isClosed |

---

## 5. Gaps — Ce Lipsește în Backend

### 5.1 API-uri care NU există dar sunt necesare

| Feature | Unde e necesar | Ce trebuie adăugat |
|---------|---------------|-------------------|
| **Update user** | Admin: UsersPage | `PUT /api/auth/users/:id` |
| **Delete user** | Admin: UsersPage | `DELETE /api/auth/users/:id` |
| **Toggle user active** | Admin: UsersPage | `PATCH /api/auth/users/:id/status` |
| **Comenzi per user** | Landing: AccountPage | `GET /api/orders?userId=` sau filtru pe `/me` |
| **Upload imagini** | Admin: Products | `POST /uploads/` (există static plugin) |
| **Stats/rapoarte** | Admin: Dashboard | `GET /api/orders/stats` (agregare) |
| **PIN login** | Store: LoginPage | `POST /api/auth/pin-login` |

### 5.2 Ce trebuie modificat în frontend

| Modul | Modificare |
|-------|-----------|
| **Store** | Eliminare buton "Înapoi" — backend nu permite |
| **Landing** | `localStorage` user → token JWT |
| **Landing** | Cart items trebuie să aibă `productId` pentru API |
| **Admin** | Toate datele mock → fetch real cu loading states |
| **Admin** | Adăugare error handling pentru toate requesturile |
| **Toate** | Adăugare interceptor pentru 401 → redirect login |
| **Toate** | Adăugare refresh token logic |

---

## 6. Plan Implementare — Fără Mock Data

### Faza 1: Setup API Client (Toate modulele)

```typescript
// api/client.ts — configurare Axios/Fetch
const API_URL = process.env.VITE_API_URL || "https://api.rotiserie.manifestit.dev";

// Interceptor: adaugă Bearer token
// Interceptor: refresh token la 401
// Interceptor: handle errors
```

### Faza 2: Auth (Toate modulele)

1. **Landing:** `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`
2. **Store:** PIN login (trebuie adăugat în backend) sau JWT
3. **Admin:** JWT cu role ADMIN/SUPERADMIN

### Faza 3: Produse (Landing + Admin)

1. **Landing:** `GET /api/products`, `GET /api/categories` → afișare meniu
2. **Admin:** CRUD complet produse + categorii

### Faza 4: Comenzi (Toate modulele)

1. **Landing:** `POST /api/orders` → checkout
2. **Landing:** `GET /api/orders/:id/track` → tracking
3. **Store:** `GET /api/orders` + SSE → Kanban board
4. **Store:** `PATCH /api/orders/:id/status` → update status
5. **Admin:** `GET /api/orders` + filtre → listă comenzi

### Faza 5: Setări (Admin)

1. `GET /api/settings` → încărcare
2. `PUT /api/settings/:key` → salvare
3. `GET /api/settings/business-hours` → program lucru
4. `PUT /api/settings/business-hours/:day` → update zi

### Faza 6: Utilizatori (Admin)

1. `GET /api/auth/users` → listă
2. `POST /api/auth/register` → creare (cu role specificat)
3. **Trebuie adăugat în backend:** `PUT /api/auth/users/:id`
4. **Trebuie adăugat în backend:** `PATCH /api/auth/users/:id/status`

### Faza 7: Real-time (Store)

1. Conectare SSE `/api/events/kitchen`
2. Ascultare `ORDER_CREATED` și `ORDER_STATUS_CHANGED`
3. Actualizare automată state fără polling

---

## 7. Configurare Server

### 7.1 Ce trebuie configurat pe serverul de producție

```env
# Backend-v2 .env
DATABASE_URL="postgresql://user:pass@localhost:5432/rotiserie"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="super-secret-key"
JWT_REFRESH_SECRET="refresh-secret-key"
STRIPE_SECRET_KEY="sk_live_..."
KITCHEN_API_KEY="kitchen-secret"
CORS_ORIGIN="https://rotiseriemoinesti.manifestit.dev,https://storerotiserie.manifestit.dev,https://adminrotiserie.manifestit.dev"
PORT=5002
```

### 7.2 Caddy (Reverse Proxy)

```
# Adăugat în Caddyfile
api.rotiserie.manifestit.dev {
    reverse_proxy localhost:5002
}
```

### 7.3 Frontend .env

```env
# apps/landing/.env
VITE_API_URL=https://api.rotiserie.manifestit.dev

# apps/store-v2/.env  
VITE_API_URL=https://api.rotiserie.manifestit.dev

# apps/admin/.env
VITE_API_URL=https://api.rotiserie.manifestit.dev
```

---

## 8. Concluzii și Recomandări

### Ce e Gata în Backend-v2
✅ Autentificare completă (JWT, refresh tokens)  
✅ CRUD produse și categorii  
✅ Flow comenzi cu 7 statusuri și validare tranziții  
✅ Setări și program de lucru pe zile  
✅ Plăți Stripe (bază)  
✅ SSE pentru real-time  
✅ Documentație Swagger la `/documentation`  

### Ce Trebuie Adăugat în Backend-v2
⚠️ `PUT /api/auth/users/:id` — editare user  
⚠️ `PATCH /api/auth/users/:id/status` — activare/dezactivare  
⚠️ `POST /api/auth/pin-login` — login cu PIN pentru store  
⚠️ `GET /api/orders/stats` — statistici pentru dashboard  
⚠️ Upload imagini produse (endpoint dedicat)  

### Ce Trebuie Modificat în Frontend
⚠️ Eliminare 100% mock data din toate modulele  
⚠️ Implementare API client cu interceptori  
⚠️ Adăugare loading states și error handling  
⚠️ Implementare JWT flow (login, refresh, logout)  
⚠️ Conectare SSE în Store pentru real-time  
⚠️ Ajustare Store: eliminare buton "Înapoi" (nu e suportat)  

---

*Research completat de: Product-Architect*  
*Data: 2026-04-24*  
*Backend analizat: v2.0.0 (Fastify + Prisma + PostgreSQL)*  
*Frontend analizat: Landing v2, Store KDS v2, Admin v1*
