# Proj1567 - Petras Restaurant

Platformă comenzi online pentru **Petras Restaurant** - Bucătărie italiană autentică în Moinești.

## Despre Petras

Petras este un restaurant italian premium cu rating 4.8/5 pe Google Maps, situat în Moinești, județul Bacău.

- **Locație:** Strada Eremia Grigorescu nr. 2, Moinești
- **Telefon:** +40 749 107 787
- **Program:** 12:00 - 21:30 (Luni-Sâmbătă), 09:00 - 18:00 (Duminică)
- **Specialități:** Pizza napoletană, paste artizanale, filet américain

## Module

| Modul | Descriere | URL |
|-------|-----------|-----|
| **Landing** | Pagina principală pentru clienți | /customer/ |
| **Store** | Dashboard bucătărie (KDS) | /store/ |
| **Admin** | Management produse, comenzi, rapoarte | /admin/ |

## URL-uri Live

- **Principal:** https://demoproj1567.manifestit.dev
- **Customer:** https://demoproj1567.manifestit.dev/customer/
- **Store:** https://demoproj1567.manifestit.dev/store/
- **Admin:** https://demoproj1567.manifestit.dev/admin/

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + Prisma
- **Database:** PostgreSQL
- **Cache:** Redis

## Pornire Locală

```bash
# Backend
cd backend-v2
npm install
npm run dev

# Frontend (Customer)
cd apps/landing
npm install
npm run dev

# Frontend (Admin)
cd apps/admin
npm install
npm run dev
```

## Deploy

```bash
# Build și deploy
cd /var/www/proj1567Petras
git add .
git commit -m "Update"
git push origin main
```

## Credențiale Test

- **Admin:** admin@petras.ro / admin123
- **Store PIN:** 1234

## Bazat pe

Proiect fork-uit și adaptat de la [Proj1566 - Rotiserie & Pizza Moinești](https://github.com/DavidAndrei33/Proj1566-rotiserie-pizza-Moinesti)

---
© 2026 Petras Restaurant. Toate drepturile rezervate.
