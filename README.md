# Macha Videos - Profesionální Dronová Produkce

Moderní landing page pro Macha Videos - profesionální dronovou video produkci (fotografie, videa, mapování, 3D modely, inspekce, timelapsy).

## 📁 Struktura projektu

```
droneweb/
├── index.html          # Hlavní stránka
├── galerie.html        # Stránka galerie
├── kontakt.html        # Kontaktní stránka
├── vybaveni.html       # Stránka vybavení
├── style.css           # Všechny styly
├── script.js           # JavaScript funkcionalita
├── data-loader.js      # Načítání dat z JSON souborů
├── admin/              # Admin panel (NOVÝ!)
│   ├── index.html      # Admin rozhraní
│   ├── app.js          # Admin logika
│   ├── style.css       # Admin styly
│   └── data/           # JSON soubory s obsahem
│       ├── services.json
│       ├── videos.json
│       ├── featured-photos.json
│       ├── photo-albums.json
│       ├── pricing.json
│       └── team.json
├── ADMIN_README.md     # Návod na správu obsahu
└── README.md           # Dokumentace
```

## 🎨 Design

Web je inspirován profesionálním designem z filipdoubrava.cz a obsahuje:

- **Tmavé téma** s moderními gradienty
- **Responzivní design** pro všechna zařízení
- **Animace** při scrollování (AOS animations)
- **Parallax efekty** na pozadích fotografií
- **Interaktivní prvky** (slider, gallery filters, album modals, FAQ accordion)
- **Moderní typografie** a layout
- **Reálné fotografie** z Unsplash API
- **Smooth scrolling** a plynulé přechody

## 🖼️ Nové funkce

### Image Slider
- Automatické přehrávání (každých 5 sekund)
- Ovládání šipkami (← →)
- Navigační tečky
- Touch/swipe podpora pro mobily
- Pauza při najetí myší

### Parallax efekty
- Hero sekce s parallax pozadím
- Dedikovaná parallax obrazová sekce
- Plynulý efekt při scrollování

### Tématická alba
- 6 kategorií fotografií
- Hover efekty na kartách
- Modal s galerií fotografií
- Lightbox pro plnou velikost obrázků

### Optimalizace
- Lazy loading obrázků
- Smooth animations
- Responzivní obrázky
- Optimalizované CSS animace

## ✨ Funkce

### Hlavní stránka (index.html)
- **Hero sekce** s reálnou fotografií pozadí a parallax efektem
- **Přehled 6 služeb** (Fotografie, Videa, Mapování, 3D Modely, Inspekce, Timelapsy)
- **Videogalerie** - Grid s 6 YouTube videi včetně https://www.youtube.com/watch?v=yqObg2kiEfI
- **Video modal** - Přehrávání YouTube videí v plné velikosti
- **Foto slider** - Automatický slider s 6 fotografiemi
- **Fotogalerie a alba** - 6 kategorií fotografií (Nemovitosti, Příroda, Města, Sport, Pobřeží, Lesy)
- **Album modal** s galerií fotografií pro každé album
- **Lightbox** pro prohlížení fotek v plné velikosti
- **O mně sekce** s fotografií a animovanými statistikami
- **Plně funkční navigace** - Domů, Služby, Videa, Fotky, Alba, O mně, Kontakt

### Galerie (galerie.html)
- **18 fotografií** z reálných zdrojů (Unsplash)
- **Filtrování projektů** podle kategorií (Fotografie, Videa, Mapování, 3D Modely)
- **Modal s plnou velikostí** pro zobrazení videí/obrázků
- **Grid layout** s hover efekty a plynulými animacemi
- **Lightbox** pro fotografie

### Kontakt (kontakt.html)
- **Kontaktní formulář** s validací
- **Kontaktní údaje** a informace
- **FAQ sekce** s accordion efektem
- **Sociální sítě**

## 🚀 Jak použít

### ⚠️ DŮLEŽITÉ: Spusťte lokální server!

Web **nefunguje** při přímém otevření souboru (`file://` protokol). Musíte spustit lokální server:

```bash
# Nejjednodušší způsob:
./start-server.sh

# Pak otevřete: http://localhost:8000
```

**Proč?** JSON data se nenačtou přes `file://` kvůli CORS omezením prohlížeče.

📖 **Detailní návod:** `LOCAL_SETUP.md`

---

### Alternativy:

1. **VS Code Live Server** (doporučeno pro vývoj)
   - Nainstalujte extension "Live Server"
   - Pravý klik na `index.html` → "Open with Live Server"

2. **Python** (na Macu předinstalován)
   ```bash
   python3 -m http.server 8000
   ```

3. **Úprava obsahu:**
   - **NOVÝ ZPŮSOB** 🎉: Použijte admin panel (viz níže)
   - Alternativně: Upravte JSON soubory v `admin/data/`

## 🎬 Admin Panel - Správa obsahu

**NOVÉ!** Web nyní načítá veškerý obsah z JSON souborů. Obsah můžete spravovat pomocí lokálního admin panelu.

### ⚡ Super rychlý způsob:

```bash
# 1. Otevřete admin v Chrome (automatické ukládání!)
./open-admin.sh

# 2. Upravte obsah, soubor se uloží do správné složky

# 3. Commitněte jedním příkazem
./commit-changes.sh "Aktualizace služeb"
```

### 📋 Klasický způsob:

```bash
# 1. Otevřete admin panel v Chrome/Edge
open -a "Google Chrome" admin/index.html

# 2. Upravte obsah, při prvním uložení vyberte složku admin/data/
# 3. Chrome si zapamatuje umístění a příště uloží automaticky

# 4. Commitněte
cd admin/data
git add .
git commit -m "Aktualizace"
git push
```

### Co můžete upravovat:
- ✅ **Služby** - název, popis
- ✅ **Video galerie** - YouTube videa
- ✅ **Vybrané fotky** - slider na hlavní stránce
- ✅ **Fotogalerie** - alba a kategorie
- ✅ **Ceník** - ceny a vlastnosti
- ✅ **Tým** - členové, fotky, dovednosti

### 🎯 Pro nejlepší UX:
- **Chrome/Edge** - automatické ukládání do správné složky
- **VS Code** - detekce změn a commit přímo z editoru
- **Terminal scripty** - `./open-admin.sh` a `./commit-changes.sh`

📖 **Návody:**
- ⚡ Rychlý start: `QUICKSTART.md`
- 📖 Detailní: `ADMIN_README.md`
- 🔧 Setup: `admin/SETUP.md`

## 🎯 Přizpůsobení

### Změna barev
V souboru `style.css` upravte CSS proměnné:
```css
:root {
    --primary-color: #3b82f6;  /* Hlavní barva */
    --secondary-color: #06b6d4; /* Sekundární barva */
    --accent-color: #8b5cf6;    /* Akcentová barva */
}
```

### Přidání vlastních obrázků
1. Nahraďte gradient backgrounds ve třídách `.work-image`, `.gallery-image-*` atd.
2. Příklad:
```css
.work-image {
    background: url('cesta/k/obrazku.jpg') center/cover;
}
```

### Úprava kontaktních údajů
V souborech `index.html`, `galerie.html` a `kontakt.html` najděte:
- Email: `info@dronepro.cz`
- Telefon: `+420 123 456 789`
- Adresa: `Praha, Česká republika`

### Propojení formuláře
V souboru `script.js` (řádek ~230) nahraďte simulovaný submit skutečným API:
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## 📱 Responzivní breakpointy

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🌐 Prohlížeče

Web je kompatibilní s:
- Chrome/Edge (poslední 2 verze)
- Firefox (poslední 2 verze)
- Safari (poslední 2 verze)
- Opera (poslední 2 verze)

## 📝 Použité technologie

- **HTML5** - Sémantický markup
- **CSS3** - Moderní styly, Grid, Flexbox, CSS proměnné
- **Vanilla JavaScript** - Žádné framework závislosti
- **SVG ikony** - Vektor grafika pro dokonalou ostrost

## 🎨 Služby na webu

1. **Fotografie** - Profesionální letecké fotografie
2. **Videa** - 4K videa pro marketing a dokumentaci
3. **Mapování** - Ortofotomapy a geodetické měření
4. **3D Modely** - Detailní 3D skenování objektů

## 💡 Tipy

- Pro production web přidejte vlastní favicon
- Optimalizujte obrázky (WebP formát)
- Přidejte Google Analytics nebo podobný tracking
- Implementujte skutečný backend pro formulář
- Zvažte přidání cookie consent banneru (GDPR)
- Přidejte meta tags pro social media (Open Graph)

## 📧 Kontakt

Pro otázky nebo úpravy webu kontaktujte:
- Email: info@dronepro.cz
- Telefon: +420 123 456 789

---

© 2026 DronePro. Všechna práva vyhrazena.
