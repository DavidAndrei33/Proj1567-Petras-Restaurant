# Design Pagină Magazin - Bucătărie (Rotiserie & Pizza Moinești)

## 1. Overview

Interfață dedicată pentru bucătărie/magazin - vizualizare și procesare comenzi noi în timp real.
Design **high-contrast, minimal, rapid** - optimizat pentru utilizare în timpul lucrului, posibil pe tabletă montată în perete.

**URL:** `/magazin` (sau subdomeniu: `magazin.rotiserie.ro`)  
**Utilizatori:** Bucătari, personal magazin  
**Acces:** Protejat cu username/parolă (sau PIN simplu)

---

## 2. Layout Structure

```
┌─────────────────────────────────────────┐
│  HEADER (sticky, z-50)                  │
│  ┌────────┬──────────────┬─────────────┐│
│  │  👨‍🍳   │  COMENZI    │  Ora 14:32  ││
│  │ Magazin│  [3 noi]    │  🔊 🔓     ││
│  └────────┴──────────────┴─────────────┘│
├─────────────────────────────────────────┤
│  FILTERS / STATS BAR                    │
│  ┌─────────────────────────────────────┐│
│  │  Toate  |  Noi  |  În preparare  |  ││
│  │  [3]      [1]       [2]            ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│  COMENZI GRID / LIST                    │
│  ┌─────────────────────────────────────┐│
│  │  ┌───────────────────────────────┐ ││
│  │  │ 🔴 #1234     14:25    75.00   │ ││
│  │  │ Pizza Quattro + Pui Rotisat   │ ││
│  │  │ Obs: Fără ceapă               │ ││
│  │  │ Tel: 0722 123 456             │ ││
│  │  │ [Primită] [În prep] [Gata] [X]│ ││
│  │  └───────────────────────────────┘ ││
│  │  ┌───────────────────────────────┐ ││
│  │  │ 🟡 #1233     14:15    45.00   │ ││
│  │  │ ...                           │ ││
│  │  └───────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│  EMPTY STATE (când nu-s comenzi)        │
│  ┌─────────────────────────────────────┐│
│  │  [Coffee icon]                    ││
│  │  "Nicio comandă activă"           ││
│  │  "Relax - sau pregătește sosul!"   ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

---

## 3. Design Tokens (referință la design-system.md)

### Culori specifice Magazin
| Element | Valoare |
|---------|---------|
| Background principal | `--color-secondary-light` (#E8F5E9) - verde foarte deschis |
| Card accent border | Variabil per status (vezi mai jos) |
| Text principal | `--color-gray-800` |
| Text secundar | `--color-gray-600` |
| Header background | `--color-secondary` (#2D6A4F) |
| Header text | White |

### Tipografie specifică
| Element | Token | Modificare |
|---------|-------|------------|
| Număr comandă | `--text-h2` | Weight 700 |
| Total comandă | `--text-h3` | `--color-primary` |
| Produse listă | `--text-body` | Weight 500 |
| Status badge | `--text-caption` | Uppercase, tracking wide |
| Ora | `--text-h4` | Monospace accent |

---

## 4. Componente Detaliate

### 4.1 Header Magazin

**Layout:**
```
Height: 72px (mai mare pentru touch-friendly)
Background: --color-secondary (#2D6A4F)
Color: white
Padding: 0 --space-4
Display: flex, align-items center, justify-content space-between
```

**Conținut:**
- **Stânga**:
  - Icon `ChefHat` 28px + "Magazin" 
  - Font: `--text-h3`, weight 600
  
- **Centru** (badge comenzi):
  - Badge: background white/20%, border-radius 9999px
  - "3 comenzi noi" sau "1 comandă nouă"
  - Font: `--text-body-sm`, weight 500
  - Pulsing animation când există comenzi noi
  
- **Dreapta**:
  - Ora curentă: font `--text-h4`, monospace
  - Icon `Volume2` (sunet on/off) - Icon Button, white
  - Icon `LogOut` (deconectare) - Icon Button, white

**Mobile:**
- Centru badge dispare, rămâne doar număr
- Butoane mai mari (48px touch target)

---

### 4.2 Stats / Filter Bar

**Layout:**
```
Background: white
Border-bottom: 1px solid --color-gray-200
Padding: --space-3 --space-4
Display: flex, gap: --space-2
Overflow-x: auto (mobile)
Sticky: sub header, top: 72px, z-index: 40
```

**Filter Chips:**
```
Same ca categorii din landing page
States: inactiv / activ / hover
```

**Filtruri:**
1. "Toate" - toate comenzile active (nu livrate/anulate)
2. "Noi 🔴" - comenzi nerezolvate (badge cu număr)
3. "În preparare 🟡" - comenzi active
4. "Gata 🟢" - de ridicat/livrat

**Counter Badge:**
- Pe fiecare filtru: câte comenzi în acea stare
- Badge: background `--color-primary`, text white, circle sau pill
- Animare: scale bounce când crește numărul

---

### 4.3 Order Card (Card Comandă)

**Layout:**
```
Background: white
Border-radius: 12px
Padding: 0
Shadow: --shadow-sm
Overflow: hidden
Transition: 200ms
```

**Border-left status:**
| Status | Border-left | Background header |
|--------|-------------|-------------------|
| Nou | 6px solid `--color-primary` | `--color-primary-light` |
| În preparare | 6px solid `--color-warning` | `--color-warning-light` |
| Gata | 6px solid `--color-success` | `--color-success-light` |
| Livrată | 6px solid `--color-gray-400` | `--color-gray-100` |

**Structură Card:**
```
┌─────────────────────────────────────────┐
│ [accent bg]                             │
│ ┌───────────────────────────────────────┐│
│ │ 🔴 #1234        14:25     75.00 lei   ││
│ │ [badge: NOU]    [timp]    [total]     ││
│ └───────────────────────────────────────┘│
├─────────────────────────────────────────┤
│                                         │
│  1× Pizza Quattro Stagioni     32.00    │
│  2× Pui Rotisat (1/2)          28.00    │
│  1× Cartofi prăjiți             8.00    │
│  1× Cola 0.5L                   7.00    │
│                               ───────── │
│                               Total: 75.00│
│                                         │
│  📱 0722 123 456                        │
│  📝 Fără ceapă, sos separat             │
│                                         │
│  [Primită] [În preparare] [Gata] [Anulează]│
│                                         │
└─────────────────────────────────────────┘
```

**Header Card:**
```
Background: variabil per status (vezi mai sus)
Padding: --space-3 --space-4
Display: flex, justify-content space-between, align-items center
```

- **Număr comandă**: "#1234"
  - Font: `--text-h3`, weight 700, `--color-gray-800`
  - Prefix `#` în `--color-gray-500`
  
- **Badge status**:
  - Badge component (din design system)
  - Poziționat lângă număr
  
- **Ora comandă**: "14:25"
  - Font: `--text-body-sm`, monospace
  - Color: `--color-gray-600`
  - Icon `Clock` 14px
  
- **Timp scurs**: "acum 5 min" / "14:25"
  - Font: `--text-caption`
  - Color: `--color-gray-500`
  - Se actualizează live
  
- **Total**: "75.00 lei"
  - Font: `--text-h3`, `--color-primary`
  - Weight 600

**Body Card:**
```
Padding: --space-4
```

**Lista Produse:**
```
Each item:
  - "1× Pizza Quattro Stagioni        32.00"
  - Font: --text-body
  - Cantitate: weight 700
  - Nume: weight 500
  - Preț: align right, --color-gray-600
  - Border-bottom: 1px dashed --color-gray-200
  - Padding: --space-2 0
```

**Total:**
```
Border-top: 2px solid --color-gray-200
Padding-top: --space-2
"Total: 75.00 lei"
Align right, --text-h4, weight 700
```

**Info Client:**
```
Margin-top: --space-3
Padding-top: --space-3
Border-top: 1px solid --color-gray-100
```

- Telefon: Icon `Phone` 16px + număr, `--text-body-sm`
- Observații: Icon `MessageSquare` 16px + text, `--text-body-sm`, `--color-gray-600`
- Adresă: Icon `MapPin` 16px + text, `--text-body-sm`

**Status Actions (Footer Card):**
```
Display: grid, grid-cols-4, gap: --space-2
Padding: --space-3 --space-4
Background: --color-gray-50
Border-top: 1px solid --color-gray-200
```

**Butoane Status:**
```
Each button:
  - Padding: --space-2
  - Border-radius: 8px
  - Font: --text-caption, weight 600, uppercase
  - Text-align: center
  - Cursor: pointer
```

| Buton | Stil | Active când |
|-------|------|-------------|
| "PRIMITĂ" | Outline `--color-primary` | Status = nou |
| "ÎN PREPARARE" | Outline `--color-warning` | Status = primită |
| "GATA" | Outline `--color-success` | Status = în prep |
| "ANULEAZĂ" | Outline `--color-error` | Orice status |

**Active State:**
```
Background: variabil (primary/warning/success)
Color: white
Border: none
Shadow: inset 0 2px 4px rgba(0,0,0,0.1)
```

**Transition:**
- 200ms ease
- La schimbare status: card pulse + border color change

---

### 4.4 Notificare Comandă Nouă

**Overlay Notificare:**
```
Position: fixed, top: 80px, right: --space-4
Z-index: 300
Max-width: 350px
```

**Card Notificare:**
```
Background: white
Border-radius: 12px
Padding: --space-4
Shadow: --shadow-xl
Border-left: 6px solid --color-primary
Animation: slideInRight + fadeIn, 400ms
```

**Conținut:**
- Icon `Bell` 24px, `--color-primary`
- "Comandă nouă!"
- "#1234 - 75.00 lei"
- "Pizza Quattro..."
- Buton: "Vezi comanda" (Primary Button, small)

**Auto-dismiss:** 8 secunde sau click "×"

**Sound:**
- Beep scurt (dacă sunetul e activat)
- Toggle în header

---

### 4.5 Comandă Gata - Animatie Specială

Când status schimbă în "Gata":
- Card border-left: flash verde 3x
- Icon `CheckCircle` apare temporar overlay
- Text "Comandă gata!" pulse
- Optional: sunet notificare diferit

---

### 4.6 Empty State

```
Display: flex, flex-direction column, align-items center, justify-content center
Min-height: 400px
Padding: --space-8
```

**Conținut:**
- Icon `Coffee` 80px, `--color-gray-300`
- Text: "Nicio comandă activă"
  - Font: `--text-h3`, `--color-gray-400`
- Subtext: "Relax - sau pregătește sosul! ☕"
  - Font: `--text-body`, `--color-gray-400`

---

### 4.7 Modal Anulare Comandă

**Trigger:** Click "Anulează" pe card

**Modal:**
```
Max-width: 400px
Title: "Anulezi comanda #1234?"
Text: "Această acțiune nu poate fi anulată."
```

**Butoane:**
- "Da, anulează" - Danger Button
- "Nu, păstrează" - Secondary Button

---

### 4.8 Modal Detalii Comandă (Expand)

**Trigger:** Click pe card (nu pe butoane)

**Modal:**
```
Max-width: 500px
Full order details
```

**Conținut extins:**
- Toate produsele cu cantități
- Preț per produs
- Total
- Info client complet
- Timeline status (când a fost plasată, când a intrat în prep, etc.)
- Buton print (icon `Printer`)

---

## 5. Interactions & Flows

### Flow Procesare Comandă
```
1. Comandă nouă primită → notificare vizuală + sonoră
2. Card apare în listă cu border roșu, badge "NOU"
3. Bucătar click "PRIMITĂ" → border galben, badge "ÎN PREPARARE"
4. Bucătar pregătește comanda
5. Când e gata, click "GATA" → border verde, badge "GATA"
6. Client ridică / livrare → click "LIVRATĂ" (sau auto după timeout)
7. Card dispare din listă activă (merge în istoric)
```

### Auto-refresh
```
Poll: la fiecare 10 secunde
WebSocket: preferat pentru real-time
Animation: card slide-in când comandă nouă
```

### Sunet Notificare
```
Toggle: header, icon Volume2 / VolumeX
Default: ON
Beep: scurt, non-intruziv
Gata: beep diferit, mai lung
```

### Confirmare Anulare
```
Click "Anulează" → modal confirmare
"Anulezi comanda #1234?" → "Da" / "Nu"
Comandă marcată anulată, dispare din listă
Toast: "Comanda #1234 a fost anulată"
```

---

## 6. Responsive Behavior

### Tablet (principal - bucătărie)
```
Layout: grid-cols-2, gap --space-4
Card: compact, mai puțin padding
Header: 64px
Status buttons: full width, mai mari
```

### Mobile
```
Layout: grid-cols-1
Card: full width
Filters: scroll horizontal
Status buttons: 2×2 grid
```

### Desktop
```
Layout: grid-cols-3, gap --space-4
Sidebar: stats în dreapta (opțional)
Card: standard
```

---

## 7. Stări Speciale

### Conexiune Pierdută
- Banner top: "Conexiune pierdută - reconectare..."
- Background: --color-error-light
- Retry automat

### Mod Noapte / Lumină Scăzută
- Toggle în header
- Crește contrast
- Fonturi mai mari
- Culori mai puțin stridente

### Timeout Comandă
- Dacă o comandă stă "Nou" > 30 min → border puls roșu
- Alertă: "Comandă #1234 așteaptă de 30 minute!"

### Prea Multe Comenzi
- Scroll vertical
- Group by status (collapsible)
- Counter badge pe fiecare grup

---

## 8. Mockup Descriere Vizuală

### Tablet View (Primary)
> Fundal verde foarte deschis. Header verde închis cu icon bucătar și "Magazin" în alb. Dreapta: ora și butoane sunet/logout. Sub header, bară albă cu filtre: "Toate", "Noi [3]", "În preparare [2]" - badge-uri colorate. Grid 2 coloane de card-uri albe. Card cu border-left roșu gros pentru comandă nouă. Header card roz-portocaliu deschis cu "#1234", badge "NOU" roșu, ora "14:25", total "75.00 lei" portocaliu. Body: listă produse, telefon, observații. Footer card gri deschis cu 4 butoane: "PRIMITĂ" roșu outline, "ÎN PREPARARE" galben, "GATA" verde, "ANULEAZĂ" gri. Butonul activ e solid colorat. Când vine comandă nouă, notificare slide-in dreapta.

### Mobile View
> Card-uri pe toată lățimea, unul sub altul. Butoane status 2×2 grid. Filtre scroll orizontal. Notificare ocupă tot ecranul de sus.

---

## 9. Tehnice

### Real-time Updates
```
Preferat: WebSocket (Socket.io)
Fallback: Server-Sent Events
Ultim: Polling 10s
```

### Print Bon
```
Icon: Printer în modal detalii
Trigger: click print
Format: print-friendly CSS
```

### Full Screen Mode
```
Button: fullscreen în header
Ideal pentru tabletă montată
```

---

*Document creat de Frontend-Architect | 2026-04-20*
