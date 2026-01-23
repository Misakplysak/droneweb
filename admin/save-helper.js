// Helper pro automatické ukládání do správné složky
// Tento soubor slouží jako návod pro nastavení prohlížeče

/*
🎯 JAK NASTAVIT AUTOMATICKÉ UKLÁDÁNÍ:

Chrome/Edge (doporučeno):
1. Při prvním uložení vyberte složku: droneweb/admin/data/
2. Klikněte "Uložit" (ne "Uložit jako")
3. Prohlížeč si zapamatuje umístění
4. Příště se soubor uloží automaticky do stejné složky!

Firefox/Safari:
- Tyto prohlížeče nepodporují automatické ukládání
- Použijte Chrome nebo Edge pro nejlepší zkušenost
- Alternativně: ručně přesuňte soubor z Downloads do admin/data/

VS Code (nejlepší řešení):
1. Otevřete admin/index.html v prohlížeči
2. Po úpravě se soubor uloží
3. VS Code automaticky detekuje změnu
4. Stačí commitnout přímo z VS Code!

Terminal workflow:
# Po úpravě v admin panelu
cd admin/data
git status  # zkontrolujte změněné soubory
git add .
git commit -m "Aktualizace obsahu"
git push

✅ TIP: Doporučujeme používat Chrome nebo Edge pro nejlepší UX!
*/

// Auto-commit pomocí simple-git (volitelné)
// Pokud chcete automatické commitování, nainstalujte:
// npm install simple-git
// a odkomeňujte níže:

/*
const simpleGit = require('simple-git');
const git = simpleGit();

async function autoCommit(filename) {
    try {
        await git.add(`admin/data/${filename}`);
        await git.commit(`Aktualizace: ${filename}`);
        console.log(`✅ Auto-commit: ${filename}`);
    } catch (err) {
        console.error('Auto-commit selhalo:', err);
    }
}
*/
