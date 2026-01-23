# 🎬 Jak upravovat obsah webu

## 📝 Jednoduchý postup:

### 1. Otevřete admin panel (v Chrome!)
```bash
# Použijte Chrome nebo Edge pro automatické ukládání
open -a "Google Chrome" admin/index.html  # na Macu
# nebo
start chrome admin/index.html  # na Windows
```

**💡 Tip:** Chrome a Edge podporují přímé ukládání do složky!

### 2. První nastavení (pouze jednou)
- Upravte nějaký obsah
- Klikněte "Uložit"
- **V dialogu uložení:**
  - Přejděte do složky `droneweb/admin/data/`
  - Ponechejte navržený název souboru
  - Klikněte "Uložit"
- Chrome si zapamatuje umístění!

### 3. Další úpravy (automatické!)
- Upravte obsah
- Klikněte "Uložit"
- **Soubor se uloží automaticky do správné složky!**
- Jen potvrďte přepis souboru

### 4. Pro Firefox/Safari uživatele
```bash
# Soubor se stáhne do Downloads, přesuňte ho:
mv ~/Downloads/services.json admin/data/services.json
```

### 5. Zkontrolujte změny lokálně
```bash
# Otevřete index.html v prohlížeči
open index.html
# Změny by měly být viditelné okamžitě!
```

### 6. Commitněte a pushněte
```bash
cd admin/data
git add .
git commit -m "Aktualizace obsahu webu"
git push
```

### 7. Změny se automaticky nasadí na Vercel
- Vercel automaticky nasadí novou verzi webu
- Web se aktualizuje během 1-2 minut

---

## 🎯 Pro pokročilé: Jednořádkový commit

```bash
# Po úpravě v admin panelu
cd admin/data && git add . && git commit -m "Aktualizace" && git push && cd ../..
```

---

## 📊 Co můžete upravovat:

### ✅ Služby (`admin/data/services.json`)
- Název služby
- Popis
- Ikona

### 🎥 Video galerie (`admin/data/videos.json`)
- Název videa
- YouTube Video ID

### 📸 Vybrané fotky - slider (`admin/data/featured-photos.json`)
- Název fotky
- Podnázev
- URL hlavní fotky
- URL náhledu

### 🖼️ Fotogalerie - alba (`admin/data/photo-albums.json`)
- Název alba
- Počet fotografií
- URL titulní fotky
- Slug alba (URL název)

### 💰 Ceník (`admin/data/pricing.json`)
- Název služby
- Cena
- Označení "Nejoblíbenější"
- Seznam vlastností

### 👥 Tým (`admin/data/team.json`)
- Jméno
- Pozice
- Popis
- URL fotky
- Dovednosti
- Sociální sítě (Instagram, YouTube, Behance)

---

## 🚨 Důležité upozornění:

- **Admin panel nefunguje na Vercel** - je pouze pro lokální použití
- **Všechny změny musíte commitnout** do gitu
- **JSON soubory musí být validní** - admin panel to zajišťuje automaticky
- **Vytvořte si zálohu** před velkými změnami

---

## 🔧 Řešení problémů:

### Web nezobrazuje změny?
1. Zkontrolujte, zda jste nahradili správný JSON soubor v `admin/data/`
2. Zkontrolujte, zda jste commitli změny
3. Vyčistěte cache prohlížeče (Ctrl+Shift+R nebo Cmd+Shift+R)

### JSON soubor se nestáhl?
1. Zkontrolujte složku Downloads
2. Zkuste změnu uložit znovu
3. Zkontrolujte, zda prohlížeč neblokuje stahování

### Změny se neprojevily na Vercelu?
1. Zkontrolujte, zda jste pushli změny (`git push`)
2. Zkontrolujte Vercel dashboard pro status nasazení
3. Vyčistěte cache CDN na Vercelu

---

**Pro více informací se podívejte do `admin/README.md`**
