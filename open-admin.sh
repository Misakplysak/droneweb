#!/bin/bash

# 🎬 Otevře admin panel v Chrome pro nejlepší UX

echo "🎬 Otevírám admin panel..."

# Zkus Chrome, pak Edge, pak default prohlížeč
if command -v google-chrome &> /dev/null; then
    google-chrome admin/index.html
elif command -v chrome &> /dev/null; then
    chrome admin/index.html
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if [ -d "/Applications/Google Chrome.app" ]; then
        open -a "Google Chrome" admin/index.html
    elif [ -d "/Applications/Microsoft Edge.app" ]; then
        open -a "Microsoft Edge" admin/index.html
    else
        open admin/index.html
    fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    start chrome admin/index.html 2>/dev/null || start msedge admin/index.html 2>/dev/null || start admin/index.html
else
    # Linux
    xdg-open admin/index.html
fi

echo "✅ Admin panel byl otevřen"
echo ""
echo "💡 Tipy:"
echo "   1. První uložení: Vyberte složku admin/data/"
echo "   2. Chrome si zapamatuje umístění"
echo "   3. Po změnách spusťte: ./commit-changes.sh"
