# 🔧 Nastavení Admin Panelu

## ⚡ Rychlé nastavení (doporučeno)

### Pro Chrome/Edge uživatele:

1. **První uložení:**
   ```bash
   cd admin
   open index.html  # otevře admin panel
   ```

2. **V admin panelu:**
   - Upravte nějaký obsah
   - Klikněte "Uložit"
   - **DŮLEŽITÉ**: V dialogu uložení:
     - Přejděte do složky `droneweb/admin/data/`
     - Ponechejte navržený název souboru
     - Klikněte "Uložit"

3. **Další ukládání:**
   - Chrome/Edge si zapamatuje umístění
   - Příště se soubor uloží automaticky!
   - Už jen potvrdíte přepis souboru

4. **Commitněte:**
   ```bash
   cd admin/data
   git add .
   git commit -m "Aktualizace obsahu"
   git push
   ```

---

## 🌐 Pro jiné prohlížeče

### Firefox/Safari:
- Nepodporují automatické ukládání
- Soubor se stáhne do Downloads
- Ručně přesuňte do `admin/data/`

```bash
# Po stažení
mv ~/Downloads/services.json admin/data/services.json
```

**Doporučení:** Použijte Chrome nebo Edge pro lepší UX

---

## 🎯 Ideální workflow

### Option 1: Chrome + Terminal
```bash
# 1. Otevřete admin v Chrome
open -a "Google Chrome" admin/index.html

# 2. Upravte obsah, soubor se uloží do správné složky

# 3. Commitněte
cd admin/data
git add .
git commit -m "Aktualizace: [co jste změnili]"
git push
```

### Option 2: VS Code + Live Server
```bash
# 1. Nainstalujte Live Server extension ve VS Code

# 2. Otevřete admin/index.html

# 3. Klikněte "Go Live" v pravém dolním rohu

# 4. Upravte obsah, soubory se ukládají automaticky

# 5. VS Code ukáže změněné soubory v Source Control

# 6. Commitněte přímo z VS Code (Ctrl+Shift+G)
```

### Option 3: Automatické commitování (advanced)
```bash
# Vytvořte helper script
cat > commit-admin.sh << 'EOF'
#!/bin/bash
cd admin/data
git add .
git commit -m "Aktualizace obsahu: $(date)"
git push
echo "✅ Změny byly nasazeny!"
EOF

chmod +x commit-admin.sh

# Po úpravách v admin panelu:
./commit-admin.sh
```

---

## 🐛 Řešení problémů

### Soubor se nestáhl?
- Zkontrolujte Downloads složku
- Povolte vyskakovací okna pro admin panel
- Zkuste jiný prohlížeč

### Chrome se neptá, kam uložit?
1. Chrome Settings → Downloads
2. Vypněte "Ask where to save each file before downloading"
3. **NEBO**: Použijte File System Access API (nejnovější verze Chrome)

### Změny se neprojeví na webu?
1. Zkontrolujte, že soubor je v `admin/data/`
2. Otevřete soubor a zkontrolujte obsah
3. Vyčistěte cache prohlížeče (Ctrl+Shift+R)
4. Zkontrolujte konzoli (F12) pro případné chyby

### Git nevidí změny?
```bash
cd admin/data
git status  # zkontrolujte, jestli jsou změny
git diff    # zobrazte změny
```

---

## 📱 Mobilní workflow (bonus)

Pro úpravy na cestách:

1. **Termux (Android):**
   ```bash
   pkg install git nodejs
   git clone [váš-repo]
   cd droneweb/admin/data
   # Editujte JSON soubory přímo
   git add . && git commit -m "Mobile update" && git push
   ```

2. **Working Copy (iOS):**
   - Nainstalujte Working Copy app
   - Klonujte repo
   - Editujte JSON soubory v app
   - Commitněte a pushněte

---

## 🎉 Hotovo!

Nyní máte plně funkční lokální CMS pro váš web.

**Máte otázky?** Zkontrolujte `admin/README.md` nebo `ADMIN_README.md`
