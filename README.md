# test
Application SIG WEB
https://faye052.github.io/sig-senegal/

---

## Progressive Web App (PWA) & Géolocalisation 🔧

- Le projet contient désormais un `manifest.json` et un `sw.js` pour permettre l'installation hors des stores (Android & iOS). Le `sw.js` inclut une page `offline.html` utilisée comme fallback quand l'app est hors-ligne.
- La géolocalisation a été améliorée: le bouton **Localiser** bascule entre une localisation ponctuelle et un suivi continu (mode "Suivre"). Les positions sont affichées sur la carte, ainsi que la précision.

## Génération des icônes 📱

Si vous voulez générer des icônes supplémentaires (tailles iOS/Android) à partir de `images/icon-512.svg` :

1. Installez `sharp` : `npm install sharp`
2. Exécutez le script : `node scripts/generate-icons.js`

Les icônes générées seront placées dans `images/icons/` et les écrans de démarrage iOS (splash) dans `images/splash/`.

---

### Génération automatique via GitHub Actions ✅
Un workflow (`.github/workflows/generate-icons.yml`) est inclus pour générer automatiquement les icônes et les écrans de démarrage à partir de `images/icon-512.svg` lors d'un push sur `main` ou via un déclencheur manuel (`workflow_dispatch`). Le workflow installe Node.js, exécute `node scripts/generate-icons.js` et commite les images générées dans `images/icons/` et `images/splash/`.

---

