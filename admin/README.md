# 🎬 Admin Panel - Macha Videos

Jednoduchý lokální admin panel pro správu obsahu webu přes JSON soubory.

> ⚠️ **DŮLEŽITÉ:** Tento admin panel je pouze pro lokální použití! Nedeployuje se na Vercel.

## 🎯 Jak to funguje

1. **Otevřete admin panel lokálně** - upravte data přes webové rozhraní
2. **Stáhne se JSON soubor** - automaticky po uložení
3. **Nahraďte soubor v `admin/data/`** - přepište starý soubor novým
4. **Commitněte změny** - `git add`, `git commit`, `git push`
5. **Web se aktualizuje automaticky** - Vercel nasadí novou verzi

## 📋 Jak použít

### 1. Otevření admin panelu
```bash
# Přejděte do složky admin
cd admin

# Otevřete index.html v prohlížeči
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 2. Správa obsahu

Admin panel umožňuje spravovat:
- ✅ **Služby** - přidávat, upravovat a mazat služby
- ✅ **Video galerie** - spravovat YouTube videa
- ✅ **Vybrané fotky** - fotky ve slideru na hlavní stránce
- ✅ **Fotogalerie** - alba s fotografiemi
- ✅ **Ceník** - cenové balíčky a vlastnosti
- ✅ **Tým** - členové týmu a jejich info

### 3. Uložení změn

Po úpravě dat:
1. Panel automaticky vygeneruje JSON soubor ke stažení
2. Uložte stažený soubor do složky `admin/data/`
3. Přepište původní soubor
4. **DŮLEŽITÉ**: Váš web se automaticky aktualizuje! Data se načítají z těchto JSON souborů
5. Commitněte změny do gitu:

```bash
git add admin/data/
git commit -m "Aktualizace obsahu"
git push
```

### 4. Zkontrolujte změny

Po nahrazení JSON souboru:
```bash
# Otevřete hlavní web lokálně
cd ..
open index.html

# Změny by měly být viditelné okamžitě!
```

## 📁 Struktura souborů

```
admin/
├── index.html          # Hlavní admin rozhraní
├── app.js             # JavaScript logika
├── style.css          # Styly admin panelu
├── README.md          # Tato dokumentace
└── data/
    ├── services.json         # Služby
    ├── videos.json           # Video galerie
    ├── featured-photos.json  # Vybrané fotky (slider)
    ├── photo-albums.json     # Fotogalerie alba
    ├── pricing.json          # Ceník
    └── team.json             # Tým
```

## 🔧 Technické detaily

- **Bez backendu** - běží čistě lokálně v prohlížeči
- **Žádné dependencies** - vanilla HTML/CSS/JS
- **JSON soubory** - data uložena v čitelných JSON souborech
- **Git workflow** - úpravy se commitují jako změny v JSON

## 💡 Tipy

### Přidání nové položky
1. Klikněte na příslušnou záložku (Služby, Videa, atd.)
2. Klikněte na tlačítko "➕ Přidat..."
3. Vyplňte formulář
4. Klikněte "Uložit"
5. Stáhněte vygenerovaný JSON soubor
6. Uložte do `admin/data/` a commitněte

### Editace existující položky
1. Najděte položku v seznamu
2. Klikněte "✏️ Upravit"
3. Proveďte změny
4. Uložte a commitněte nový JSON

### Mazání položky
1. Najděte položku
2. Klikněte "🗑️ Smazat"
3. Potvrďte
4. Uložte a commitněte

## 🎨 URL adres obrázků

Pro obrázky můžete použít:
- **Unsplash** - `https://images.unsplash.com/...`
- **Vlastní hosting** - nahrajte obrázky někam a použijte URL
- **YouTube thumbnaily** - automaticky pro videa

## 🚀 Budoucí rozšíření

V budoucnu můžete přidat:
- Více sekcí (blog, portfolio, atd.)
- Drag & drop pro změnu pořadí
- Náhled před uložením
- Validace URL adres
- Backup & restore funkce

## ⚠️ Důležité

- **Nedeployujte tuto složku na Vercel** - je pouze pro lokální použití
- Vždy commitněte změny v JSON souborech
- Záložní kopie doporučena před velkými změnami
- JSON soubory musí být validní (automaticky zajištěno)

## 📞 Kontakt

Pro otázky a problémy s admin panelem vytvořte issue nebo mě kontaktujte.

---

**Happy editing! 🎉**
