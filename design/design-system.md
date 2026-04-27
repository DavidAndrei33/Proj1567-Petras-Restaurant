# Design System - Rotiserie & Pizza Moinești

## 1. Overview

Design system consistent pentru platforma de comenzi online "Rotiserie & Pizza Moinești". 
Design curat, cald, apetisant - reflectă identitatea unei afaceri locale de familie din Moinești.

**Principii:**
- Mobile-first (majoritatea clienților vor comanda de pe telefon)
- Simplitate și claritate
- Accesibilitate (contrast bun, fonturi lizibile)
- Feedback vizual imediat (hover, active states)

---

## 2. Paleta de Culori

### Brand Colors
| Token | Hex | Utilizare |
|-------|-----|-----------|
| `--color-primary` | `#E85D04` | Butoane principale, accent, CTA |
| `--color-primary-hover` | `#D14903` | Hover butoane primary |
| `--color-primary-light` | `#FFF0E6` | Background subtle, badge light |
| `--color-secondary` | `#2D6A4F` | Complementar, header, elemente admin |
| `--color-secondary-hover` | `#23553F` | Hover secondary |
| `--color-secondary-light` | `#E8F5E9` | Background zones admin/magazin |

### Semantic Colors
| Token | Hex | Utilizare |
|-------|-----|-----------|
| `--color-success` | `#2D6A4F` | Status "gata", confirmare, succes |
| `--color-success-light` | `#E8F5E9` | Background success |
| `--color-warning` | `#F4A261` | Status "în preparare", avertizare |
| `--color-warning-light` | `#FFF3E0` | Background warning |
| `--color-error` | `#E63946` | Status "anulată", eroare, ștergere |
| `--color-error-light` | `#FFEBEE` | Background error |
| `--color-info` | `#457B9D` | Informații, link-uri |

### Neutral Colors
| Token | Hex | Utilizare |
|-------|-----|-----------|
| `--color-white` | `#FFFFFF` | Background principal |
| `--color-gray-50` | `#F8F9FA` | Background alternativ, card-uri |
| `--color-gray-100` | `#F1F3F5` | Input background, hover table |
| `--color-gray-200` | `#E9ECEF` | Borders, dividers |
| `--color-gray-300` | `#DEE2E6` | Border inputs |
| `--color-gray-400` | `#ADB5BD` | Placeholder text |
| `--color-gray-500` | `#6C757D` | Text secundar, labels |
| `--color-gray-600` | `#495057` | Body text |
| `--color-gray-700` | `#343A40` | Heading-uri |
| `--color-gray-800` | `#212529` | Text principal |
| `--color-gray-900` | `#121212` | Text dark mode |

### Dark Mode (opțional, viitor)
| Token | Hex |
|-------|-----|
| `--color-dark-bg` | `#1A1A2E` |
| `--color-dark-surface` | `#16213E` |
| `--color-dark-text` | `#EAEAEA` |

---

## 3. Tipografie

### Font Family
- **Principal:** `Inter` (Google Fonts) - modern, lizibil, excelent pe toate dimensiunile
- **Fallback:** `system-ui, -apple-system, sans-serif`
- **Heading-uri:** `Inter` (weight 600-700)
- **Body:** `Inter` (weight 400-500)

### Scale
| Token | Size | Weight | Line Height | Letter Spacing | Utilizare |
|-------|------|--------|-------------|----------------|-----------|
| `--text-display` | 48px (3rem) | 700 | 1.1 | -0.02em | Hero title (desktop) |
| `--text-h1` | 36px (2.25rem) | 700 | 1.2 | -0.01em | Page title |
| `--text-h2` | 28px (1.75rem) | 600 | 1.3 | -0.01em | Section title |
| `--text-h3` | 22px (1.375rem) | 600 | 1.4 | 0 | Card title, subsection |
| `--text-h4` | 18px (1.125rem) | 600 | 1.4 | 0 | Item title |
| `--text-h5` | 16px (1rem) | 600 | 1.5 | 0 | Label, small title |
| `--text-body-lg` | 18px (1.125rem) | 400 | 1.6 | 0 | Body text large |
| `--text-body` | 16px (1rem) | 400 | 1.6 | 0 | Body text standard |
| `--text-body-sm` | 14px (0.875rem) | 400 | 1.5 | 0 | Descriere, metadata |
| `--text-caption` | 12px (0.75rem) | 500 | 1.4 | 0.01em | Caption, badge text |
| `--text-button` | 16px (1rem) | 600 | 1 | 0 | Butoane |
| `--text-button-sm` | 14px (0.875rem) | 600 | 1 | 0 | Butoane mici |

### Responsive Tipografie (Mobile < 640px)
| Token | Mobile Size |
|-------|-------------|
| `--text-display` | 32px |
| `--text-h1` | 28px |
| `--text-h2` | 24px |
| `--text-h3` | 20px |
| `--text-h4` | 16px |

---

## 4. Spacing Scale

| Token | Value | Utilizare |
|-------|-------|-----------|
| `--space-1` | 4px (0.25rem) | Icon gaps, tight spacing |
| `--space-2` | 8px (0.5rem) | Inline spacing, small gaps |
| `--space-3` | 12px (0.75rem) | Input padding, button padding-sm |
| `--space-4` | 16px (1rem) | Card padding, section gap-sm |
| `--space-5` | 20px (1.25rem) | Medium gaps |
| `--space-6` | 24px (1.5rem) | Standard section padding |
| `--space-8` | 32px (2rem) | Large gaps, card padding-lg |
| `--space-10` | 40px (2.5rem) | Section padding |
| `--space-12` | 48px (3rem) | Large section gaps |
| `--space-16` | 64px (4rem) | Hero padding, large sections |
| `--space-20` | 80px (5rem) | Page section gaps |

---

## 5. Layout & Grid

### Breakpoints
| Name | Width | Utilizare |
|------|-------|-----------|
| `sm` | 640px | Telefoane mari |
| `md` | 768px | Tablete |
| `lg` | 1024px | Desktop mic |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop mare |

### Container
- Max width: 1280px (`xl`)
- Padding: `--space-4` (16px) mobile, `--space-6` (24px) tablet, `--space-8` (32px) desktop
- Centered with `margin: 0 auto`

### Grid System
- CSS Grid / Flexbox based
- Landing page products: `grid-cols-1` mobile → `grid-cols-2` md → `grid-cols-3` lg → `grid-cols-4` xl
- Admin tables: full width, scroll horizontal pe mobile
- Magazin cards: `grid-cols-1` mobile → `grid-cols-2` lg

---

## 6. Componente Reutilizabile

### 6.1 Butoane

**Primary Button**
```
Background: --color-primary (#E85D04)
Text: white, --text-button
Padding: --space-3 --space-6 (12px 24px)
Border-radius: 8px (rounded-lg)
Hover: --color-primary-hover, transform: translateY(-1px)
Active: scale(0.98)
Disabled: opacity 0.5, cursor not-allowed
Shadow: 0 2px 4px rgba(232, 93, 4, 0.2)
```

**Secondary Button**
```
Background: transparent
Border: 2px solid --color-primary
Text: --color-primary
Padding: --space-3 --space-6
Border-radius: 8px
Hover: --color-primary-light background
```

**Danger Button**
```
Background: --color-error
Text: white
Hover: darken 10%
```

**Button Sizes**
| Size | Padding | Font |
|------|---------|------|
| Small | 8px 16px | --text-button-sm |
| Medium | 12px 24px | --text-button |
| Large | 16px 32px | --text-button-lg |

**Icon Button**
- 40px × 40px
- Icon centered
- Border-radius: 8px
- Used for: +, -, ✕, settings

---

### 6.2 Input-uri

**Text Input**
```
Height: 48px (mobile-friendly)
Background: white
Border: 1px solid --color-gray-300
Border-radius: 8px
Padding: --space-3 --space-4
Font: --text-body
Focus: border --color-primary, shadow 0 0 0 3px --color-primary-light
Error: border --color-error, background --color-error-light
Placeholder: --color-gray-400
```

**Number Input (cantitate)**
```
Width: 80px
Height: 40px
Text-align: center
Buttons +/- pe laterale
```

**Select/Dropdown**
```
Same as Text Input
Dropdown arrow: ChevronDown icon
Options: dropdown panel with shadow
```

**Textarea**
```
Min-height: 100px
Resize: vertical
Same styling as Text Input
```

---

### 6.3 Card-uri

**Product Card**
```
Background: white
Border: 1px solid --color-gray-200
Border-radius: 12px
Padding: 0 (image top) / --space-4 (content bottom)
Shadow: 0 1px 3px rgba(0,0,0,0.08)
Hover: shadow 0 4px 12px rgba(0,0,0,0.12), transform translateY(-2px)
Image: aspect-ratio 4:3, object-fit cover, border-radius top 12px
```

**Order Card (Magazin)**
```
Background: white
Border-left: 4px solid --color-warning (variază per status)
Border-radius: 8px
Padding: --space-4
Shadow: 0 1px 3px rgba(0,0,0,0.08)
Hover: background --color-gray-50
```

**Stats Card (Admin)**
```
Background: white
Border-radius: 12px
Padding: --space-6
Icon top-right: 40px, --color-primary-light background
Number: --text-h1, --color-gray-800
Label: --text-body-sm, --color-gray-500
```

---

### 6.4 Badge-uri

| Status | Background | Text | Icon |
|--------|------------|------|------|
| Nou | --color-primary-light | --color-primary | ● |
| În preparare | --color-warning-light | --color-warning | ⏱ |
| Gata | --color-success-light | --color-success | ✓ |
| Livrată | --color-gray-100 | --color-gray-600 | ✓ |
| Anulată | --color-error-light | --color-error | ✕ |

```
Padding: 4px 12px
Border-radius: 9999px (full)
Font: --text-caption
Display: inline-flex, align-items center, gap 4px
```

---

### 6.5 Modal / Dialog

```
Overlay: rgba(0,0,0,0.5), backdrop-filter blur(4px)
Panel: white, border-radius 16px, max-width 500px
Padding: --space-6
Animation: fade in 0.2s, scale from 0.95 to 1
Close button: top-right, X icon
```

**Cart Modal / Slide-out**
```
Desktop: slide-out panel dreapta, width 400px, overlay left
Mobile: full-screen modal from bottom
Animation: translateX (desktop) / translateY (mobile)
```

---

### 6.6 Toast / Notification

```
Position: top-right or bottom-center (mobile)
Background: white or dark (per type)
Border-left: 4px solid (per type)
Border-radius: 8px
Padding: --space-4
Shadow: 0 4px 12px rgba(0,0,0,0.15)
Animation: slide in from right/top, auto-dismiss after 4s
Types: success, error, warning, info
```

---

### 6.7 Tabel (Admin)

```
Header: background --color-gray-50, font-weight 600, text --color-gray-600
Rows: border-bottom 1px --color-gray-200
Row hover: background --color-gray-50
Cell padding: --space-3 --space-4
Text: --text-body-sm
Action buttons: icon buttons, grouped
Empty state: centered illustration + text
```

---

## 7. Iconografie

**Set:** [Lucide React](https://lucide.dev) - modern, consistent, tree-shakeable

**Iconițe principale:**
| Icon | Utilizare |
|------|-----------|
| `ShoppingCart` | Coș, checkout |
| `Plus`, `Minus` | Cantitate +/- |
| `Trash2` | Ștergere produs |
| `ChefHat` | Logo, header magazin |
| `UtensilsCrossed` | Meniu, categorii |
| `Clock` | Program, timp estimat |
| `Phone` | Telefon contact |
| `MapPin` | Adresă |
| `CreditCard` | Plată |
| `CheckCircle` | Confirmare, succes |
| `AlertCircle` | Eroare, atenționare |
| `Settings` | Admin setări |
| `LogOut` | Deconectare |
| `Edit` | Editare |
| `Search` | Căutare |
| `Filter` | Filtrare |
| `ArrowLeft`, `ArrowRight` | Navigare |
| `X` | Închidere, ștergere |

**Dimensiuni icon:**
- Small: 16px (inline, buttons)
- Medium: 20px (navigation, labels)
- Large: 24px (standalone, stats)

---

## 8. Efecte & Animații

### Transitions
| Proprietate | Durată | Easing |
|-------------|--------|--------|
| Default | 200ms | ease-in-out |
| Button hover | 150ms | ease-out |
| Modal open | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Toast | 400ms | ease-out |
| Page load | 500ms | ease-out |

### Shadows
| Token | Valoare |
|-------|---------|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.08) |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) |
| `--shadow-xl` | 0 20px 25px rgba(0,0,0,0.12) |

---

## 9. Z-Index Scale

| Layer | Z-Index |
|-------|---------|
| Background | 0 |
| Content | 10 |
| Sticky header | 50 |
| Overlay | 100 |
| Modal | 200 |
| Toast | 300 |
| Tooltip | 400 |

---

## 10. Formulare

### Form Layout
```
Label: --text-h5, --color-gray-700, margin-bottom --space-1
Input: full width
Error message: --text-caption, --color-error, margin-top --space-1
Helper text: --text-caption, --color-gray-500
Spacing între fields: --space-4
```

### Validation States
| State | Indicator |
|-------|-----------|
| Default | border --color-gray-300 |
| Focus | border --color-primary, ring 3px --color-primary-light |
| Valid | border --color-success, checkmark icon |
| Invalid | border --color-error, message below |
| Disabled | opacity 0.6, background --color-gray-100 |

---

## 11. Export Design Tokens

### Tailwind Config (pentru Builder-Modules)

```javascript
// tailwind.config.js extend
colors: {
  primary: {
    DEFAULT: '#E85D04',
    hover: '#D14903',
    light: '#FFF0E6',
  },
  secondary: {
    DEFAULT: '#2D6A4F',
    hover: '#23553F',
    light: '#E8F5E9',
  },
  success: '#2D6A4F',
  warning: '#F4A261',
  error: '#E63946',
  info: '#457B9D',
}
```

---

*Document creat de Frontend-Architect | 2026-04-20*
