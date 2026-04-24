# ETF Predictor — PWA

Outil d'analyse quantitative pour ETFs et actions. Signaux techniques, momentum, backtest.

## Fichiers

```
etf_predictor_v2.html   ← application principale
manifest.json           ← config PWA
sw.js                   ← service worker (cache offline)
icon-192.png            ← icône PWA (à créer, voir ci-dessous)
icon-512.png            ← icône PWA (à créer, voir ci-dessous)
```

## Déploiement GitHub Pages (5 minutes)

1. Crée un repo GitHub (ex: `etf-predictor`)
2. Upload tous les fichiers dans ce repo
3. Va dans **Settings → Pages → Source → main branch / root**
4. L'app sera disponible sur `https://ton-username.github.io/etf-predictor/etf_predictor_v2.html`

> **Pourquoi GitHub Pages ?**  
> Yahoo Finance bloque les requêtes fetch() depuis `file://` (CORS).  
> Depuis une origine HTTPS comme GitHub Pages, les requêtes passent directement — aucun proxy nécessaire.

## Icônes PWA (optionnel)

Pour les icônes, tu peux générer des PNG depuis n'importe quel générateur d'icônes PWA :
- https://favicon.io
- https://realfavicongenerator.net

Ou simplement supprimer les lignes `icons` dans `manifest.json` si tu n'en veux pas.

## Installer comme PWA

Une fois sur GitHub Pages, Chrome affichera une icône d'installation dans la barre d'adresse.  
Clique dessus → **Installer** → l'app apparaît comme une app native sur le bureau/mobile.
