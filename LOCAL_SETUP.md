# 🌐 Lokální testování webu

## ⚠️ DŮLEŽITÉ: Proč web nefunguje lokálně?

Když otevřete `index.html` přímo v prohlížeči (double-click), používá se `file://` protokol:
```
file:///Users/michal/droneweb/index.html
```

**Problém:** Prohlížeče **blokují načítání JSON souborů** z `file://` kvůli bezpečnostním omezením (CORS).

**Řešení:** Musíte spustit **lokální webový server** → použije se `http://` protokol.

---

## ⚡ Rychlé řešení (3 způsoby):

### 1️⃣ Automatický script (NEJJEDNODUŠŠÍ)

```bash
./start-server.sh
```

Pak otevřete: **http://localhost:8000**

✅ Funguje s Pythonem, PHP nebo Node.js (automaticky detekuje)

---

### 2️⃣ Python (na Macu předinstalován)

```bash
# Python 3 (doporučeno)
python3 -m http.server 8000

# Nebo Python 2
python -m SimpleHTTPServer 8000
```

Otevřete: **http://localhost:8000**

---

### 3️⃣ VS Code Live Server (NEJLEPŠÍ pro vývoj)

1. **Nainstalujte extension:**
   - Otevřete VS Code
   - Extensions (Cmd+Shift+X)
   - Hledejte "Live Server" od Ritwick Dey
   - Klikněte Install

2. **Spusťte server:**
   - Otevřete `index.html` ve VS Code
   - Klikněte "Go Live" v pravém dolním rohu
   - Nebo pravý klik na soubor → "Open with Live Server"

3. **Výhody:**
   - ✅ Auto-refresh při změnách
   - ✅ Běží na http://127.0.0.1:5500
   - ✅ Port forwarding pro mobily

---

## 📱 Alternativní řešení:

### 4️⃣ PHP (pokud máte nainstalovaný)

```bash
php -S localhost:8000
```

### 5️⃣ Node.js (http-server)

```bash
# Jednorázové použití (bez instalace)
npx http-server -p 8000

# Nebo nainstalujte globálně
npm install -g http-server
http-server -p 8000
```

### 6️⃣ npx serve (moderní způsob)

```bash
npx serve -p 8000
```

---

## 🎯 Workflow pro vývoj:

### Doporučený způsob (VS Code):

```bash
# 1. Otevřete projekt ve VS Code
code .

# 2. Nainstalujte Live Server extension (pouze jednou)

# 3. Otevřete index.html

# 4. Klikněte "Go Live" v pravém dolním rohu

# ✅ Web se otevře na http://127.0.0.1:5500
# ✅ Automaticky se obnoví při změnách
```

### Rychlý způsob (Terminal):

```bash
# Spusťte server
./start-server.sh

# V jiném terminálu:
./open-admin.sh  # Upravte obsah

# Obnovte prohlížeč na http://localhost:8000
```

---

## 🐛 Řešení problémů:

### Data se stále nenačítají?

1. **Zkontrolujte konzoli (F12):**
   ```
   Failed to load resource: net::ERR_FILE_NOT_FOUND
   ```
   → Používáte file:// protokol, spusťte server!

2. **Zkontrolujte URL v prohlížeči:**
   - ❌ `file:///Users/michal/...` → ŠPATNĚ
   - ✅ `http://localhost:8000` → DOBŘE

3. **Vyčistěte cache:**
   - Mac: Cmd + Shift + R
   - Windows: Ctrl + Shift + R

### Port 8000 je obsazený?

```bash
# Použijte jiný port
python3 -m http.server 8001
# Pak: http://localhost:8001
```

### Žádný Python/PHP/Node.js?

**Nainstalujte Python** (nejjednodušší):
```bash
# Mac (Homebrew)
brew install python3

# Windows
# Stáhněte z: https://www.python.org/downloads/
```

---

## 📋 Checklist pro lokální vývoj:

- [ ] Spusťte lokální server (`./start-server.sh`)
- [ ] Otevřete `http://localhost:8000` (NE `file://`)
- [ ] Zkontrolujte, že data se načítají (F12 → Console)
- [ ] Pro admin panel použijte Chrome (`./open-admin.sh`)
- [ ] Po změnách commitněte (`./commit-changes.sh`)

---

## 🚀 Production vs Development:

| Prostředí | URL | Jak spustit |
|-----------|-----|-------------|
| **Lokální (vývoj)** | `http://localhost:8000` | `./start-server.sh` |
| **Production (Vercel)** | `https://vase-domena.vercel.app` | `git push` |

---

## 💡 Pro budoucnost:

### Přidejte do package.json (volitelné):

```json
{
  "name": "droneweb",
  "version": "1.0.0",
  "scripts": {
    "dev": "python3 -m http.server 8000",
    "admin": "open -a 'Google Chrome' admin/index.html",
    "commit": "cd admin/data && git add . && git commit -m 'Update' && git push"
  }
}
```

Pak:
```bash
npm run dev     # Spustí server
npm run admin   # Otevře admin
npm run commit  # Commitne změny
```

---

**Rychlý start:**
```bash
./start-server.sh
# Pak otevřete: http://localhost:8000
```

✅ Nyní by měl web fungovat s načtenými daty!
