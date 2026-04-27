# Design Pagină Admin - Management (Rotiserie & Pizza Moinești)

## 1. Overview

Panou administrativ pentru gestionarea completă a afacerii - produse, categorii, comenzi istorice, setări.
Design **curat, administrativ, eficient** - optimizat pentru utilizare pe laptop/tabletă.

**URL:** `/admin` (sau subdomeniu: `admin.rotiserie.ro`)  
**Utilizatori:** Administrator, manager  
**Acces:** Autentificare cu username și parolă

---

## 2. Layout Structure

```
┌─────────────────────────────────────────┐
│  TOP NAV BAR (sticky, z-50)             │
│  ┌────────┬──────────────────────────┬─┐│
│  │ ⚙️    │  Dashboard  Meniu  Comenzi │ ││
│  │ Admin  │  Setări                  👤│ ││
│  └────────┴──────────────────────────┴─┘│
├────────────────┬──────────────────────────┤
│  SIDEBAR       │  MAIN CONTENT            │
│  (desktop)     │                          │
│  ┌───────────┐ │  ┌────────────────────┐│
│  │ Dashboard │ │  │  STAT CARDS          ││
│  │ Meniu     │ │  │  ┌────┐ ┌────┐ ┌────┐││
│  │ Comenzi   │ │  │ 150  │ │ 2340 │ │ 42  ││
│  │ Setări    │ │  │Comen│ │Lei   │ │Prod ││
│  │           │ │  └────┘ └────┘ └────┘││
│  └───────────┘ │  ┌────────────────────┐│
│  (mobile:      │  │  CHART / TABLE       ││
│   bottom nav)  │  │                      ││
│                │  └────────────────────┘│
│                │                          │
└────────────────┴──────────────────────────┘
```

---

## 3. Design Tokens (referință la design-system.md)

### Culori specifice Admin
| Element | Valoare |
|---------|---------|
| Sidebar background | `--color-gray-50` |
| Sidebar active | `--color-primary-light` |
| Sidebar text | `--color-gray-600` |
| Sidebar text active | `--color-primary` |
| Top nav background | White |
| Top nav border | `--color-gray-200` |
| Content background | `--color-gray-50` |
| Card background | White |
| Stats card icon bg | `--color-primary-light` |

---

## 4. Componente Detaliate

### 4.1 Pagină Login

**Layout:**
```
Min-height: 100vh
Display: flex, align-items center, justify-content center
Background: --color-gray-50
```

**Login Card:**
```
Max-width: 420px
Width: 90%
Background: white
Border-radius: 16px
Padding: --space-8
Shadow: --shadow-lg
Text-align: center
```

**Conținut:**
1. **Logo**: Icon `ChefHat` 48px, `--color-primary`
2. **Title**: "Panou Administrare"
   - Font: `--text-h1`
   - Color: `--color-gray-800`
   
3. **Subtitle**: "Rotiserie & Pizza Moinești"
   - Font: `--text-body`, `--color-gray-500`

4. **Formular:**
   
   **Username:**
   - Label: "Nume utilizator"
   - Icon left: `User` 20px, `--color-gray-400`
   - Placeholder: "admin"
   - Input: standard cu icon
   
   **Password:**
   - Label: "Parolă"
   - Icon left: `Lock` 20px
   - Icon right: `Eye` / `EyeOff` (toggle visibility)
   - Placeholder: "••••••••"
   - Input: type password

5. **Buton Login:**
   - Text: "Autentificare"
   - Variant: Primary Button, Large, full width
   - Loading: spinner + "Se autentifică..."

6. **Error Message:**
   - Background: --color-error-light
   - Border: 1px solid --color-error
   - Text: --color-error
   - Icon: `AlertCircle`
   - "Username sau parolă incorectă"

**Footer Login:**
```
Text: "© 2026 Rotiserie & Pizza Moinești"
Font: --text-caption, --color-gray-400
Margin-top: --space-6
```

---

### 4.2 Top Navigation Bar

**Layout:**
```
Height: 64px
Background: white
Border-bottom: 1px solid --color-gray-200
Padding: 0 --space-6
Display: flex, align-items center, justify-content space-between
Position: sticky, top: 0, z-index: 50
```

**Stânga:**
- Icon `Settings` + "Admin" (hidden mobile)
- Hamburger menu (mobile only)

**Centru (Desktop):**
- Nav links: "Dashboard" | "Meniu" | "Comenzi" | "Setări"
- Font: `--text-body-sm`, weight 500
- Active: color `--color-primary`, border-bottom 2px `--color-primary`
- Hover: color `--color-primary`

**Dreapta:**
- Icon `Bell` + badge (notificări)
- Avatar/User: "👤 Admin" + dropdown
  - "Profil" (disabled)
  - "Setări"
  - Separator
  - "Deconectare" (icon `LogOut`, color `--color-error`)

**Mobile:**
- Hamburger: deschide sidebar drawer
- Bottom nav: 4 icon-uri (Dashboard, Meniu, Comenzi, Setări)
- Height bottom nav: 64px

---

### 4.3 Sidebar (Desktop > 1024px)

**Layout:**
```
Width: 240px
Background: white
Border-right: 1px solid --color-gray-200
Height: calc(100vh - 64px)
Position: fixed, left: 0, top: 64px
Padding: --space-4 0
```

**Items:**
```
Each item:
  - Padding: --space-3 --space-4
  - Display: flex, align-items center, gap: --space-3
  - Border-radius: 0 (full width hover)
  - Font: --text-body, weight 500
```

**Menu Items:**
| Icon | Label | Badge |
|------|-------|-------|
| `LayoutDashboard` | Dashboard | - |
| `UtensilsCrossed` | Meniu | - |
| `ShoppingBag` | Comenzi | "12" |
| `PieChart` | Statistici | - |
| `Settings` | Setări | - |

**Active State:**
```
Background: --color-primary-light
Color: --color-primary
Border-left: 3px solid --color-primary
Icon: --color-primary
```

**Hover:**
```
Background: --color-gray-50
```

---

### 4.4 Dashboard (Home Admin)

**Layout:**
```
Padding: --space-6
Max-width: 1200px
```

**Stats Cards Grid:**
```
Grid: 1 col mobile, 2 cols md, 4 cols lg
Gap: --space-4
Margin-bottom: --space-8
```

**Stat Card:**
```
Background: white
Border-radius: 12px
Padding: --space-5
Border: 1px solid --color-gray-200
Shadow: --shadow-sm
```

**Structură:**
```
┌─────────────────┐
│  [Icon]         │  ← 40px, background --color-primary-light, border-radius 8px
│                 │
│  150            │  ← --text-h1, --color-gray-800
│  Comenzi azi    │  ← --text-body-sm, --color-gray-500
│  +12% vs ieri   │  ← --text-caption, --color-success
└─────────────────┘
```

**4 Card-uri:**
1. **Comenzi azi**: Icon `ShoppingBag`, number, "+12% vs ieri"
2. **Venituri azi**: Icon `DollarSign` (sau `Banknote`), "2,340 lei", "+8% vs ieri"
3. **Produse active**: Icon `Package`, "42 produse", "2 indisponibile"
4. **Clienți noi**: Icon `Users`, "8 clienți", "3 comenzi recurenți"

**Chart Section:**
```
Background: white
Border-radius: 12px
Padding: --space-6
Border: 1px solid --color-gray-200
```

- Title: "Vânzări săptămânale"
- Font: `--text-h3`
- Chart: bar chart sau line chart (simplu, librărie recomandată: Recharts)
- Height: 300px
- Colors: `--color-primary` pentru bars

**Comenzi Recente Table:**
```
Margin-top: --space-6
Background: white
Border-radius: 12px
Border: 1px solid --color-gray-200
Overflow: hidden
```

- Title: "Comenzi recente"
- Button: "Vezi toate →" (dreapta, link la pagina Comenzi)
- Table: 5 rânduri, columns: Nr, Ora, Client, Total, Status

---

### 4.5 Pagină Meniu (CRUD Produse)

**Layout:**
```
Padding: --space-6
Max-width: 1200px
```

**Header:**
```
Display: flex, justify-content space-between, align-items center
Margin-bottom: --space-6
```

- Title: "Gestionare Meniu"
  - Font: `--text-h1`
  
- Butoane:
  - "Adaugă categorie" - Secondary Button, small
  - "Adaugă produs" - Primary Button, icon `Plus`

**Tabs / Filter:**
```
Background: --color-gray-100
Border-radius: 8px
Padding: 4px
Display: inline-flex
```

- "Toate produsele" | "Pizza" | "Pui" | "Garnituri" | etc.
- Active: background white, shadow-sm, color `--color-gray-800`
- Inactive: color `--color-gray-500`

**Produse Grid / Table:**

**Variantă A - Card Grid (recomandat):**
```
Grid: 1 col mobile, 2 cols md, 3 cols lg, 4 cols xl
Gap: --space-4
```

**Product Admin Card:**
```
Background: white
Border-radius: 12px
Border: 1px solid --color-gray-200
Overflow: hidden
```

```
┌─────────────────┐
│  [Imagine]      │  ← aspect 16:9, object-fit cover
├─────────────────┤
│  Pizza Margherita│  ← --text-h4
│  Pizza          │  ← --text-caption, --color-gray-500
│                 │
│  28.00 lei      │  ← --text-h4, --color-primary
│                 │
│  [🟢 Disponibil]│  ← Badge success
│                 │
│  [✏️]  [🗑️]    │  ← Icon buttons
└─────────────────┘
```

**Imagine:**
- Aspect 16:9
- Object-fit cover
- Placeholder: icon `Image` + "Fără imagine" (centered)

**Info:**
- Nume: `--text-h4`, weight 600
- Categorie: badge `--color-gray-100`, text `--color-gray-600`
- Preț: `--text-h3`, `--color-primary`

**Status:**
- Disponibil: badge `--color-success`
- Indisponibil: badge `--color-error`
- Toggle switch (fără text)

**Acțiuni:**
- Edit: Icon Button `Edit`, `--color-primary`
- Șterge: Icon Button `Trash2`, `--color-error`

---

### 4.6 Formular Produs (Modal / Page)

**Layout:**
```
Max-width: 600px
Desktop: modal centered
Mobile: full page
```

**Header:**
- "Adaugă produs nou" / "Editează produs"
- Close: X icon

**Form:**
```
Padding: --space-6
Gap: --space-4
```

**Fields:**

1. **Imagine produs**
   - Upload zone: dashed border `--color-gray-300`, border-radius 12px
   - Height: 200px
   - Icon: `Upload` 48px, `--color-gray-400`
   - Text: "Drag & drop sau click pentru upload"
   - Subtext: "PNG, JPG (max 2MB)"
   - Preview: imagine cropată în zona de upload
   - Buton ștergere imagine: icon `X`, top-right

2. **Nume produs** (required)
   - Label: "Nume produs"
   - Placeholder: "Ex: Pizza Quattro Stagioni"
   - Input: standard
   - Validation: min 2 caractere

3. **Descriere** (optional)
   - Label: "Descriere"
   - Placeholder: "Ingrediente, detalii..."
   - Textarea, 3 rânduri

4. **Categorie** (required)
   - Label: "Categorie"
   - Select dropdown cu categorii existente
   - + buton "Adaugă categorie nouă" (deschide sub-form)

5. **Preț** (required)
   - Label: "Preț (lei)"
   - Input: number, step 0.01
   - Placeholder: "0.00"
   - Suffix: "lei"
   - Validation: > 0

6. **Disponibil** (toggle)
   - Label: "Produs disponibil"
   - Toggle switch
   - Default: ON
   - Help: "Dezactivează pentru a ascunde produsul din meniu"

**Footer:**
```
Display: flex, justify-content flex-end, gap: --space-3
Padding: --space-4 --space-6
Border-top: 1px solid --color-gray-200
```

- "Anulează" - Secondary Button
- "Salvează produs" - Primary Button
- Loading: "Se salvează..."

---

### 4.7 Modal Ștergere Produs

**Trigger:** Click `Trash2` pe card

**Modal:**
```
Max-width: 400px
Icon: AlertTriangle 48px, --color-warning
Title: "Ești sigur?"
Text: "Produsul 'Pizza Margherita' va fi șters definitiv."
Subtext: "Această acțiune nu poate fi anulată."
```

**Butoane:**
- "Da, șterge" - Danger Button
- "Anulează" - Secondary Button

---

### 4.8 Pagină Comenzi Istorice

**Layout:**
```
Padding: --space-6
Max-width: 1200px
```

**Header:**
- Title: "Istoric Comenzi"
- Subtitle: "Toate comenzile plasate"

**Filters:**
```
Display: flex, gap: --space-3, flex-wrap
Margin-bottom: --space-6
```

- **Date picker**: "De la" / "Până la" (input date)
- **Status filter**: Select (Toate, Primită, În prep, Gata, Livrată, Anulată)
- **Search**: Input cu icon `Search`, placeholder "Caută după număr, client..."
- **Buton**: "Resetează filtre" - text button, `--color-primary`

**Table Comenzi:**
```
Background: white
Border-radius: 12px
Border: 1px solid --color-gray-200
Overflow: hidden
```

**Header:**
```
Background: --color-gray-50
Font: --text-body-sm, weight 600, --color-gray-600
Padding: --space-3 --space-4
```

**Columns:**
| Column | Width | Align |
|--------|-------|-------|
| Nr. comandă | 100px | left |
| Dată/Ora | 150px | left |
| Client | 200px | left |
| Produse | auto | left |
| Total | 100px | right |
| Status | 130px | center |
| Acțiuni | 100px | center |

**Row:**
```
Border-bottom: 1px solid --color-gray-200
Padding: --space-3 --space-4
Font: --text-body-sm
Hover: background --color-gray-50
```

**Cell content:**
- Nr: `#1234`, bold, `--color-primary`
- Dată: "20 Apr 2026, 14:25"
- Client: nume + telefon
- Produse: "3 produse" sau lista scurtă
- Total: `--text-body`, weight 600
- Status: Badge (din design system)
- Acțiuni: Icon Button `Eye` (view), `Printer` (print)

**Pagination:**
```
Display: flex, justify-content center, align-items center
Gap: --space-2
Margin-top: --space-6
```

- "← Precedenta" / "Următoarea →"
- Page numbers: 1, 2, 3, ..., 10
- Active page: background `--color-primary`, white text
- Per page: 10, 25, 50 (select)

**Empty State:**
- Icon `Search` 48px, `--color-gray-300`
- "Nicio comandă găsită"
- "Încearcă alte filtre"

---

### 4.9 Pagină Setări

**Layout:**
```
Padding: --space-6
Max-width: 800px
```

**Header:**
- Title: "Setări Magazin"

**Sections:**

**1. Program de Lucru**
```
Card: white, border-radius 12px, border 1px --color-gray-200, padding --space-6
Margin-bottom: --space-6
```

- Title: "Program de lucru"
- Icon: `Clock`

**Zile săptămână:**
```
Each day:
  - Checkbox: activ/inactiv
  - Label: "Luni", "Marți", etc.
  - Ora deschidere: time input
  - Ora închidere: time input
  - Stare: "Deschis" / "Închis"
```

**2. Date Contact**
```
Card: same style
```

- Title: "Date contact"
- Icon: `Phone`
- Fields:
  - Telefon: input
  - Adresă: textarea
  - Email: input (opțional)

**3. Setări Plată**
```
Card: same style
```

- Title: "Plăți"
- Icon: `CreditCard`
- Options:
  - Checkbox: "Accept plata cu cardul (Stripe)"
  - Checkbox: "Accept plata la livrare (cash)"
  - Checkbox: "Accept plata la ridicare"

**4. Setări Livrare**
```
Card: same style
```

- Title: "Livrare"
- Icon: `Truck` (sau `MapPin`)
- Fields:
  - Taxă livrare: number input (lei)
  - Livrare gratuită de la: number input (lei)
  - Timp estimat livrare: number (minute)

**Buton Salvare:**
- "Salvează setări" - Primary Button, full width mobile, auto desktop
- Loading: "Se salvează..."
- Success: Toast "Setări salvate cu succes"

---

## 5. Interactions & Flows

### Flow Adaugă Produs
```
1. Admin click "Adaugă produs" în pagina Meniu
2. Modal formular apare
3. Completează: imagine, nume, categorie, preț
4. Toggle disponibil (default ON)
5. Click "Salvează"
   → Loading state
   → Toast: "Produs adăugat cu succes"
   → Modal închide
   → Card nou apare în grid (fade in)
```

### Flow Editează Produs
```
1. Click ✏️ pe card produs
2. Modal formular cu date pre-completate
3. Modifică câmpuri
4. Click "Salvează"
   → Toast: "Produs actualizat"
   → Card se actualizează
```

### Flow Șterge Produs
```
1. Click 🗑️ pe card
2. Modal confirmare: "Ești sigur?"
3. Click "Da, șterge"
   → Toast: "Produs șters"
   → Card fade out
```

### Flow Schimbă Disponibilitate
```
1. Click toggle pe card
2. API call: PATCH produs
3. Toggle animare: slide
4. Badge se actualizează: Disponibil/Indisponibil
5. Toast: "Stare produs actualizată"
```

### Flow Vezi Comandă
```
1. Pagina Comenzi → click 👁️ pe rând
2. Modal/Sidebar cu detalii complete
3. Lista produse, info client, total
4. Timeline status
5. Buton print
```

---

## 6. Responsive Behavior

### Mobile (< 640px)
- Sidebar: hidden, bottom nav 4 icon-uri
- Stats cards: 1-2 cols
- Produse: 1 col
- Tables: scroll horizontal
- Formular produs: full page
- Modals: full screen

### Tablet (640px - 1024px)
- Sidebar: compact (80px, doar icon-uri)
- Stats cards: 2 cols
- Produse: 2-3 cols
- Tables: full width

### Desktop (> 1024px)
- Sidebar: 240px full
- Stats cards: 4 cols
- Produse: 3-4 cols
- Tables: full width

---

## 7. Stări Speciale

### Loading (Dashboard)
- Skeleton cards: 4 card-uri gri animate
- Skeleton chart: box gri, animat
- Skeleton table: 5 rânduri

### Eroare Server
- Banner top: "Eroare de conexiune. Reîncercare..."
- Buton "Reîncearcă"

### Date necompletate
- Empty states per pagină
- Icon + text + CTA

### Sesiune expirată
- Redirect la login
- Toast: "Sesiunea a expirat. Te rugăm să te autentifici din nou."

---

## 8. Mockup Descriere Vizuală

### Desktop Dashboard
> Sidebar gri deschis stânga cu icon-uri colorate și text. Logo sus. Conținut dreapta pe fundal gri foarte deschis. Top nav alb cu link-uri și avatar. Dashboard cu 4 card-uri statistice albe, icon portocaliu în cerc portocaliu deschis, număr mare gri, label gri. Sub card-uri, chart dreptunghiular alb. Tabel comenzi cu header gri, rânduri alternate. Toate elementele cu border-radius consistent.

### Mobile
> Top nav compact cu hamburger. Conținut pe toată lățimea. Bottom nav cu 4 icon-uri. Card-uri statistice pe 2 coloane. Produse pe o coloană. Formulare pe tot ecranul.

---

*Document creat de Frontend-Architect | 2026-04-20*
