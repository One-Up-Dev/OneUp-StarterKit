# Nettoyage du repository

Nettoie les fichiers temporaires et de test crees par les agents.

---

## Fichiers a nettoyer

### 1. Screenshots et captures Playwright

```bash
# Dossiers de screenshots
rm -rf playwright-report/
rm -rf test-results/
rm -rf screenshots/
rm -rf .playwright/

# Screenshots individuels
find . -name "*.png" -path "*/test*" -delete
find . -name "screenshot*.png" -delete
```

### 2. Fichiers de test temporaires

```bash
# Tests temporaires
find . -name "*.test.tmp.*" -delete
find . -name "*.spec.tmp.*" -delete

# Fichiers debug
find . -name "*.debug.*" -delete
find . -name "debug-*.log" -delete
```

### 3. Fichiers de cache

```bash
# Cache Next.js (garder .next mais nettoyer le cache)
rm -rf .next/cache/

# Cache tests
rm -rf node_modules/.cache/playwright/
```

### 4. Logs de tests

```bash
# Logs
find . -name "test-*.log" -delete
find . -name "playwright-*.log" -delete
```

---

## Execution

### Mode interactif (recommande)

1. Liste les fichiers qui seront supprimes :
```bash
# Screenshots
find . -name "screenshot*.png" -o -name "*.test.tmp.*" 2>/dev/null

# Dossiers
ls -d playwright-report test-results screenshots 2>/dev/null
```

2. Demande confirmation a l'utilisateur avant suppression

3. Supprime les fichiers confirmes

### Mode automatique

Si l'utilisateur confirme "nettoyer tout" :

```bash
# Nettoyage complet
rm -rf playwright-report/ test-results/ screenshots/ .playwright/
find . -name "screenshot*.png" -delete 2>/dev/null
find . -name "*.test.tmp.*" -delete 2>/dev/null
find . -name "*.spec.tmp.*" -delete 2>/dev/null
find . -name "debug-*.log" -delete 2>/dev/null
find . -name "test-*.log" -delete 2>/dev/null
```

---

## Fichiers a NE PAS supprimer

- `*.test.ts` / `*.test.tsx` - Tests permanents
- `*.spec.ts` / `*.spec.tsx` - Specs permanentes
- `.env*` - Variables d'environnement
- `node_modules/` - Dependances (sauf cache)
- `.git/` - Historique Git
- `src/` - Code source
- `public/` - Assets publics

---

## Rapport

Apres nettoyage, affiche :

```
## Nettoyage termine

### Fichiers supprimes
- X screenshots
- X fichiers temporaires
- X fichiers de log

### Espace libere
~X Mo

### Dossiers nettoyes
- playwright-report/
- test-results/
```

---

## Utilisation

```
/clean-up
```

Options :
- Sans argument : Mode interactif (liste + confirmation)
- Avec "all" : Supprime tout sans confirmation
