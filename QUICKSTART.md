# ⚡ Rychlý start - Správa obsahu

## ⚠️ NEJDŘÍV: Spusťte lokální server!

```bash
# Web nefunguje bez serveru kvůli CORS
./start-server.sh

# Otevřete v prohlížeči: http://localhost:8000
```

📖 Proč? Viz `LOCAL_SETUP.md`

---

## 🎯 Vyzkoušejte hned teď!

### 1. Otevřete admin panel (v Chrome!)
```bash
# Použijte Chrome nebo Edge pro automatické ukládání
open -a "Google Chrome" admin/index.html
```

### 2. Přidejte novou službu
1. Klikněte na záložku **"Služby"**
2. Klikněte na **"➕ Přidat službu"**
3. Vyplňte:
   - **Název**: "Test služba"
   - **Popis**: "Toto je testovací služba"
   - **Ikona**: "image"
4. Klikněte **"Uložit"**
5. Stáhne se soubor `services.json`

### 3. Uložte soubor (automaticky!)
**V Chrome/Edge:**
- První uložení: Vyberte složku `admin/data/`
- Další ukládání: Soubor se uloží automaticky!

**V jiných prohlížečích:**
```bash
# Přesuňte z Downloads
mv ~/Downloads/services.json admin/data/services.json
```

### 4. Zkontrolujte změny
```bash
# Otevřete hlavní web
open index.html

# ✅ Měli byste vidět novou službu na hlavní stránce!
```

### 5. Vraťte změny zpět (volitelné)
```bash
# Pokud to byl jen test, smazejte testovací službu v admin panelu
# a znovu stáhněte services.json
```

---

## 📝 Další příklady

### Přidat nové video
1. Admin panel → záložka **"Video galerie"**
2. **"➕ Přidat video"**
3. Název: "Můj nový projekt"
4. YouTube ID: `dQw4w9WgXcQ` (ID z URL: `youtube.com/watch?v=dQw4w9WgXcQ`)
5. Uložit → stáhnout → nahradit `admin/data/videos.json`
6. Obnovit web → měli byste vidět nové video!

### Upravit cenu
1. Admin panel → záložka **"Ceník"**
2. Najděte položku a klikněte **"✏️ Upravit"**
3. Změňte cenu nebo vlastnosti
4. Uložit → stáhnout → nahradit `admin/data/pricing.json`

### Přidat člena týmu
1. Admin panel → záložka **"Tým"**
2. **"➕ Přidat člena týmu"**
3. Vyplňte jméno, pozici, popis, URL fotky
4. Přidejte dovednosti (např. "DJI Mini 3 Pro", "Premiere Pro")
5. Uložit → stáhnout → nahradit `admin/data/team.json`

---

## 🚀 Production workflow

```bash
# 1. Upravte obsah v admin panelu
cd admin && open index.html

# 2. Stáhněte a nahraďte JSON soubor
mv ~/Downloads/[soubor].json admin/data/

# 3. Zkontrolujte změny lokálně
open index.html

# 4. Commitněte
git add admin/data/
git commit -m "Aktualizace: [co jste změnili]"

# 5. Pushněte na Vercel
git push

# ✅ Změny se projeví na webu do 1-2 minut!
```

---

## ⚠️ Časté chyby

### JSON soubor se nestáhl?
- Zkontrolujte Downloads složku
- Zkuste prohlížeč povolit stahování
- Některé prohlížeče blokují automatické stahování

### Změny se neprojevily?
- Zkontrolujte, že jste nahradili správný soubor v `admin/data/`
- Vyčistěte cache (Ctrl+Shift+R / Cmd+Shift+R)
- Zkontrolujte konzoli prohlížeče (F12) pro případné chyby

### Web nezobrazuje data?
- Ujistěte se, že `data-loader.js` je připojen v HTML
- Zkontrolujte, že JSON soubory jsou validní (admin panel to zajišťuje)
- Otevřete konzoli prohlížeče (F12) a hledejte chyby

---

**Máte otázky? Přečtěte si `ADMIN_README.md` pro detailní návod!**
