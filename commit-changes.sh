#!/bin/bash

# 🚀 Rychlý commit script pro admin změny
# Použití: ./commit-changes.sh "Popis změny"

cd admin/data

# Zkontroluj změny
if [ -z "$(git status --porcelain)" ]; then
    echo "❌ Žádné změny k commitnutí"
    exit 0
fi

# Zobraz změny
echo "📝 Změněné soubory:"
git status --short

# Commit message
MESSAGE=${1:-"Aktualizace obsahu"}

# Commitni a pushni
git add .
git commit -m "$MESSAGE"
git push

echo "✅ Změny byly nasazeny!"
echo "🌐 Web se aktualizuje během 1-2 minut na Vercel"
