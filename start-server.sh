#!/bin/bash

# 🌐 Spustí lokální webový server

echo "🌐 Spouštím lokální webový server..."
echo ""

# Zkus Python 3
if command -v python3 &> /dev/null; then
    echo "✅ Používám Python 3"
    echo "🌐 Server běží na: http://localhost:8000"
    echo "📱 Otevřete v prohlížeči: http://localhost:8000"
    echo ""
    echo "⚠️  Pro zastavení stiskněte Ctrl+C"
    echo ""
    python3 -m http.server 8000
# Zkus Python 2
elif command -v python &> /dev/null; then
    echo "✅ Používám Python 2"
    echo "🌐 Server běží na: http://localhost:8000"
    echo "📱 Otevřete v prohlížeči: http://localhost:8000"
    echo ""
    echo "⚠️  Pro zastavení stiskněte Ctrl+C"
    echo ""
    python -m SimpleHTTPServer 8000
# Zkus PHP
elif command -v php &> /dev/null; then
    echo "✅ Používám PHP"
    echo "🌐 Server běží na: http://localhost:8000"
    echo "📱 Otevřete v prohlížeči: http://localhost:8000"
    echo ""
    echo "⚠️  Pro zastavení stiskněte Ctrl+C"
    echo ""
    php -S localhost:8000
# Zkus Node.js
elif command -v npx &> /dev/null; then
    echo "✅ Používám Node.js (http-server)"
    echo "🌐 Server běží na: http://localhost:8000"
    echo "📱 Otevřete v prohlížeči: http://localhost:8000"
    echo ""
    echo "⚠️  Pro zastavení stiskněte Ctrl+C"
    echo ""
    npx http-server -p 8000
else
    echo "❌ Nenalezen Python, PHP ani Node.js"
    echo ""
    echo "📦 Nainstalujte jeden z těchto:"
    echo "   - Python: https://www.python.org/downloads/"
    echo "   - PHP: https://www.php.net/downloads"
    echo "   - Node.js: https://nodejs.org/"
    echo ""
    echo "💡 Nebo použijte VS Code extension 'Live Server'"
    exit 1
fi
