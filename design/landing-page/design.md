# Design Landing Page - Client (Rotiserie & Pizza Moinești)

## 1. Overview

Pagina principală pentru clienți - vizualizare meniu, coș de cumpărături, checkout și confirmare comandă.
Design **mobile-first**, optimizat pentru comenzi rapide de pe telefon.

**URL:** `/`  
**Utilizatori:** Clienți finali (public)  
**Acces:** Public, nu necesită autentificare

---

## 2. Layout Structure

```
┌─────────────────────────────────────────┐
│  HEADER (sticky, z-50)                  │
│  ┌────────┬────────────────────┬───────┐│
│  │  Logo  │  Program | Telefon  │  Coș  ││
│  └────────┴────────────────────┴───────┘│
├─────────────────────────────────────────┤
│  HERO SECTION                           │
│  ┌─────────────────────────────────────┐│
│  │  [Imagine rotiserie/pizza]          ││
│  │  "Rotiserie & Pizza Moinești"       ││
│  │  "Comandă online - Livrare rapidă" ││
│  │  [Button: Vezi Meniul ↓]           ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│  MENIU SECTION                          │
│  ┌─────────────────────────────────────┐│
│  │  CATEGORII (scroll horizontal)      ││
│  │  [Toate][Pizza][Pui][Garnituri][..]││
│  ├─────────────────────────────────────┤│
│  │  PRODUSE GRID                       ││
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ││
│  │  │Imagine │ │Imagine │ │Imagine │ ││
│  │  │Nume    │ │Nume    │ │Nume    │ ││
│  │  │Preț    │ │Preț    │ │Preț    │ ││
│  │  │[Adaugă]│ │[Adaugă]│ │[Adaugă]│ ││
│  │  └────────┘ └────────┘ └────────┘ ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│  COȘ (slide-out panel, fixed right)     │
│  [Apare la click pe iconița coș]        │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  ┌─────────────────────────────────────┐│
│  │  Adresă | Program | Telefon         ││
│  │  "© 2026 Rotiserie & Pizza Moinești"││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

---

## 3. Design Tokens (referință la design-system.md)

Folosește toate token-urile din design-system.md. Specifice landing page:

### Culori specifice
| Element | Valoare |
|---------|---------|
| Hero overlay | `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))` |
| Hero text | White |
| Categorie activă | `--color-primary` background, white text |
| Categorie inactivă | `--color-gray-100` background, `--color-gray-600` text |

---

## 4. Componente Detaliate

### 4.1 Header (Sticky)

**Structură:**
```
Height: 64px mobile, 72px desktop
Background: white
Border-bottom: 1px solid --color-gray-200
Position: sticky, top: 0, z-index: 50
Shadow on scroll: --shadow-sm
```

**Conținut:**
- **Logo** (stânga): Icon `ChefHat` + text "Rotiserie & Pizza" (font: `--text-h4`, color: `--color-primary`)
- **Info** (centru, hidden mobile): 
  - Icon `Clock` + "L-D: 10:00-22:00"
  - Icon `Phone` + "0722 123 456"
  - Font: `--text-caption`, color: `--color-gray-500`
- **Coș** (dreapta):
  - Icon `ShoppingCart` + badge cu număr produse (cerc roșu, text alb)
  - Total preț sub icon: `--text-caption`, `--color-primary`
  - Hover: background `--color-gray-50`, border-radius 8px
  - Click: deschide coș panel

**Mobile (< 640px):**
- Info centru dispare
- Logo mai mic
- Coș rămâne, badge mai mare

---

### 4.2 Hero Section

**Layout:**
```
Height: auto, min-height 400px mobile / 500px desktop
Background: imagine full-width, object-fit cover
Overlay: gradient întunecat (vezi Culori specifice)
Padding: --space-16 vertical
Text-align: center
```

**Conținut:**
1. **Titlu**: "Rotiserie & Pizza Moinești"
   - Font: `--text-display` (32px mobile, 48px desktop)
   - Color: white, text-shadow 0 2px 4px rgba(0,0,0,0.3)
   
2. **Subtitlu**: "Comandă online și savurează preparatele noastre proaspete"
   - Font: `--text-body-lg`
   - Color: white, opacity 0.9
   
3. **CTA Button**: "Vezi Meniul ↓"
   - Variant: Primary Button
   - Icon: `ChevronDown`
   - Click: smooth scroll la secțiunea Meniu
   - Shadow: 0 4px 12px rgba(232, 93, 4, 0.3)
   
4. **Badge program** (sub CTA):
   - "Deschis acum" / "Închis - deschidem mâine la 10:00"
   - Badge: background `--color-success` sau `--color-gray-600`
   - Auto-calculate based on time

**Responsive:**
- Mobile: padding --space-8, titlu 32px
- Tablet: padding --space-12
- Desktop: padding --space-16, titlu 48px

---

### 4.3 Categorii Meniu (Scroll Horizontal)

**Layout:**
```
Position: sticky, top: 64px (sub header), z-index: 40
Background: white
Border-bottom: 1px solid --color-gray-200
Padding: --space-3 vertical
Overflow-x: auto (scroll horizontal pe mobile)
Scrollbar: hidden
```

**Items:**
```
Display: inline-flex, gap: --space-2
Each category:
  - Padding: --space-2 --space-4
  - Border-radius: 9999px
  - Font: --text-body-sm, weight 500
  - White-space: nowrap
  - Cursor: pointer
```

**States:**
- **Inactiv**: background `--color-gray-100`, color `--color-gray-600`
- **Hover**: background `--color-gray-200`
- **Activ**: background `--color-primary`, color white, shadow-sm
- **Transition**: 200ms

**Categorii (default):**
1. "Toate" (default activ)
2. "Pizza"
3. "Pui Rotisat"
4. "Garnituri"
5. "Băuturi"
6. "Desert"

**Scroll snap (mobile):**
```css
scroll-snap-type: x mandatory;
scroll-snap-align: start;
```

---

### 4.4 Grid Produse

**Layout:**
```
Padding: --space-6
Grid:
  - mobile: 1 col, gap --space-4
  - md: 2 cols, gap --space-4  
  - lg: 3 cols, gap --space-6
  - xl: 4 cols, gap --space-6
```

**Product Card:**
```
Background: white
Border: 1px solid --color-gray-200
Border-radius: 12px
Overflow: hidden
Shadow: --shadow-sm
Hover: --shadow-md, translateY(-2px)
Transition: 200ms
```

**Card Structure:**
```
┌─────────────────┐
│  [Imagine]      │  ← aspect-ratio 4:3, object-fit cover
│                 │
├─────────────────┤
│  Nume Produs    │  ← --text-h4, --color-gray-800
│  Descriere scurt│  ← --text-body-sm, --color-gray-500, 2 linii
│                 │
│  25.00 lei      │  ← --text-h3, --color-primary
│  [ + Adaugă ]   │  ← Primary Button, full width
└─────────────────┘
```

**Buton "Adaugă în coș":**
- Default: text "+ Adaugă", icon `Plus`
- La click: se transformă în counter
  ```
  ┌─────────────────┐
  │ [−]  3  [+]    │
  │   [🗑️ Șterge]  │
  └─────────────────┘
  ```
- Counter: `--space-2` gap, border 1px `--color-gray-200`, border-radius 8px
- Butoane +/-: Icon Button 32px, `--color-primary` border
- Număr: width 40px, text-align center, font `--text-body`, weight 600
- Ștergere: apare sub counter, text `--text-caption`, color `--color-error`

**Empty State (categorie fără produse):**
- Icon `UtensilsCrossed` 48px, `--color-gray-300`
- Text: "Nu există produse în această categorie"
- Font: `--text-body`, `--color-gray-400`

---

### 4.5 Coș (Slide-out Panel)

**Desktop:**
```
Position: fixed, right: 0, top: 0, bottom: 0
Width: 400px
Background: white
Shadow: --shadow-xl
Z-index: 200
Animation: translateX(100%) → translateX(0), 300ms
```

**Mobile (< 640px):**
```
Position: fixed, left: 0, right: 0, bottom: 0
Height: 85vh
Border-radius: 16px 16px 0 0
Animation: translateY(100%) → translateY(0), 300ms
Draggable handle (top center)
```

**Header Coș:**
```
Padding: --space-4
Border-bottom: 1px solid --color-gray-200
Title: "Coșul tău" (--text-h3)
Close: Icon Button, X icon (dreapta)
```

**Lista Produse:**
```
Scrollable, flex-1
Padding: --space-4
Gap: --space-4 între items
```

**Item în coș:**
```
┌─────────────────────────────────┐
│ [Img]  Nume Produs              │
│ 40×40  25.00 lei                │
│        [−] 2 [+]  [🗑️]          │
└─────────────────────────────────┘
```
- Imagine: 48px × 48px, border-radius 8px
- Nume: `--text-body`, weight 500
- Preț unitar: `--text-caption`, `--color-gray-500`
- Counter: same ca Product Card
- Ștergere: Icon Button 32px, `--color-error`

**Footer Coș:**
```
Padding: --space-6
Border-top: 1px solid --color-gray-200
Background: white
```

**Calcul:**
```
Subtotal:      75.00 lei    (--text-body)
Livrare:       10.00 lei    (--text-caption, --color-gray-500)
──────────────────────
Total:         85.00 lei    (--text-h3, --color-primary)
```

**Buton Checkout:**
- Text: "Finalizează comanda →"
- Variant: Primary Button, Large, full width
- Icon: `ArrowRight`
- Disabled: când coș e gol

**Coș Gol:**
- Icon `ShoppingCart` 64px, `--color-gray-300`
- Text: "Coșul tău este gol"
- Subtext: "Adaugă produse din meniu"
- Button: "Vezi Meniul" (Secondary Button)

---

### 4.6 Checkout (Pagină / Modal)

**Variantă A - Modal (recomandat pentru simplitate):**
```
Full-screen modal overlay
Max-width: 600px, centered
Scrollable content
```

**Variantă B - Pagină separată `/checkout`:**
```
Same layout ca modal but full page
Back button: "← Înapoi la meniu"
```

**Header:**
```
Title: "Finalizează comanda"
Close/Back: Icon Button, ArrowLeft
Progress steps: Coș → Detalii → Confirmare
Current step: --color-primary
Completed: --color-success, checkmark
```

**Formular:**
```
Padding: --space-6
Gap: --space-4 între fields
```

**Fields:**
1. **Nume complet** (required)
   - Label: "Nume și prenume"
   - Placeholder: "Ex: Ion Popescu"
   - Validation: min 2 caractere

2. **Telefon** (required)
   - Label: "Număr de telefon"
   - Placeholder: "07xx xxx xxx"
   - Input type: tel
   - Validation: format RO mobil

3. **Adresă** (required)
   - Label: "Adresă de livrare"
   - Placeholder: "Stradă, număr, bloc, scară, apartament"
   - Textarea, min-height 80px

4. **Observații** (optional)
   - Label: "Observații (opțional)"
   - Placeholder: "Ex: Fără ceapă, ușă la intrare..."
   - Textarea, min-height 60px
   - Helper: "Orice cerință specială pentru comandă"

**Rezumat Comandă (sidebar pe desktop, accordion pe mobile):**
```
Card: background --color-gray-50, border-radius 12px
Produse: lista compactă (nume × cantitate = preț)
Subtotal
Livrare: 10 lei (sau "Gratuit pentru comenzi > 50 lei")
Total: --text-h3, --color-primary
```

**Buton Plasare:**
- Text: "Plătește cu cardul" sau "Plasează comanda (plată la livrare)"
- Variant: Primary Button, Large, full width
- Icon: `CreditCard` sau `CheckCircle`
- Loading state: spinner + "Se procesează..."

---

### 4.7 Pagină Confirmare

**Layout:**
```
Min-height: 100vh
Display: flex, align-items center, justify-content center
Background: --color-gray-50
```

**Card Confirmare:**
```
Max-width: 500px
Background: white
Border-radius: 16px
Padding: --space-8
Text-align: center
Shadow: --shadow-lg
```

**Conținut:**
1. **Icon**: `CheckCircle` 80px, `--color-success`
   - Animation: scale 0 → 1, bounce
   
2. **Title**: "Comandă plasată cu succes!"
   - Font: `--text-h1`
   - Color: `--color-gray-800`
   
3. **Număr comandă**: "Comanda #1234"
   - Font: `--text-h3`
   - Color: `--color-primary`
   - Badge style
   
4. **Detalii**:
   ```
   ┌─────────────────────────────┐
   │  Timp estimat: 30-45 min   │
   │  Telefon: 0722 123 456    │
   │  Status: În preparare     │
   └─────────────────────────────┘
   ```
   - Icon `Clock` + text
   - Icon `Phone` + text
   - Badge status: "În preparare" (warning)
   
5. **Mesaj**: "Te vom contacta pentru confirmare. Mulțumim!"
   - Font: `--text-body`, `--color-gray-600`
   
6. **CTA**: "Înapoi la meniu"
   - Variant: Secondary Button
   - Link: `/`

**Auto-refresh status:**
- Poll la fiecare 30 secunde pentru update status
- Badge se actualizează automat

---

### 4.8 Footer

**Layout:**
```
Background: --color-gray-800
Color: white
Padding: --space-8 vertical
Margin-top: --space-12
```

**Grid:**
```
Mobile: 1 col, text-center
Desktop: 3 cols
```

**Coloane:**
1. **Brand**
   - Icon `ChefHat` + "Rotiserie & Pizza Moinești"
   - Font: `--text-h4`
   
2. **Contact**
   - Icon `MapPin` + "Str. Principală nr. 1, Moinești"
   - Icon `Phone` + "0722 123 456"
   - Icon `Clock` + "L-D: 10:00 - 22:00"
   - Font: `--text-body-sm`
   - Color: `--color-gray-400`
   
3. **Legal**
   - "© 2026 Rotiserie & Pizza Moinești"
   - Font: `--text-caption`
   - Color: `--color-gray-500`

---

## 5. Interactions & Flows

### Flow Comandă Complet
```
1. User intră pe site → vede Hero + Meniu
2. Selectează categorie sau rămâne pe "Toate"
3. Click "Adaugă în coș" pe produs
   → Button se transformă în counter
   → Badge coș se actualizează
   → Toast: "Produs adăugat în coș"
4. Continuă să adauge produse
5. Click pe icon coș → deschide panel
6. Review produse, ajustează cantități
7. Click "Finalizează comanda"
8. Completează formular (nume, telefon, adresă)
9. Click "Plătește cu cardul" / "Plasează comanda"
   → Loading state
   → Stripe checkout (redirect) sau confirmare directă
10. Redirect la pagina Confirmare
    → Afișează număr comandă, timp estimat
11. User poate închide pagina sau reveni la meniu
```

### Hover & Click States
| Element | Hover | Click/Active |
|---------|-------|--------------|
| Product Card | shadow↑, translateY(-2px) | scale(0.98) |
| Buton Adaugă | brightness(1.1) | scale(0.96) |
| Buton +/- | background --color-primary-light | scale(0.9) |
| Categorie | background darken | --color-primary |
| Coș item | background --color-gray-50 | - |
| Link footer | underline, color --color-primary | - |

### Animations
| Element | Animation | Durată |
|---------|-----------|--------|
| Hero text | fadeInUp, stagger 0.1s | 600ms |
| Product cards | fadeIn, stagger 0.05s | 400ms |
| Coș panel | slideInRight/slideInBottom | 300ms |
| Toast | slideInRight + fade | 300ms |
| Badge counter | scale bounce | 300ms |
| Confirmare icon | scale bounce | 500ms |

---

## 6. Responsive Behavior

### Mobile (< 640px)
- Header: logo mic, doar coș
- Hero: 32px title, padding --space-8
- Categorii: scroll horizontal, snap
- Produse: 1 col, card full width
- Coș: full bottom sheet, 85vh
- Checkout: full screen modal
- Footer: 1 col, centered

### Tablet (640px - 1024px)
- Header: info vizibile
- Hero: 40px title
- Produse: 2 cols
- Coș: slide-out 350px
- Checkout: modal 600px

### Desktop (> 1024px)
- Produse: 3-4 cols
- Coș: slide-out 400px
- Checkout: modal max 700px
- Footer: 3 cols

---

## 7. Stări Speciale

### Offline
- Toast: "Conexiunea la internet a fost pierdută"
- Retry button pe acțiuni

### Loading Produse
- Skeleton cards: 3-6 card-uri cu shimmer
- Height: same as product card

### Eroare Server
- Icon `AlertCircle` 48px
- Text: "Nu am putut încărca meniul"
- Button: "Încearcă din nou"

### Coș Gol (în panel)
- Vezi descrierea în componenta Coș

### Program Închis
- Overlay pe întreg site-ul
- Text: "Momentan suntem închiși"
- Subtext: "Deschidem mâine la 10:00"
- Disable toate butoanele "Adaugă"

---

## 8. Mockup Descriere Vizuală

### Desktop View
> O pagină curată cu header alb, logo portocaliu, hero cu poză apetisantă de pui rotisat suprapusă cu text alb și buton portocaliu "Vezi Meniul". Sub hero, un band sticky cu categorii rotunjite (Toate, Pizza, Pui, etc.). Grid de card-uri produse cu imagini, nume, preț portocaliu și buton portocaliu "Adaugă". La click pe coș, panel slide-out dreapta cu produse, cantități +/- și total. Checkout modal cu formular curat. Footer gri închis cu contact.

### Mobile View
> Header compact cu logo și coș. Hero pe tot ecranul cu text mare și buton. Categorii scroll orizontal. Card-uri produse pe toată lățimea, imagine mare. Coș se deschide ca bottom sheet cu drag handle. Formular checkout pe tot ecranul cu câmpuri mari, friendly. Confirmare cu icon verde mare și număr comandă.

---

*Document creat de Frontend-Architect | 2026-04-20*
